import { Response } from "express";
import { default as db } from "../database";
import { COLLECTIONS } from "../collections";
import { Task } from "../entities/task.entity";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";

export class TaskService {
  static async create(email: string, body: CreateTaskDto, res: Response): Promise<void> {
    try {
      const { title, description, dateExpire, stateTask } = body;
      const docRef = db.collection(COLLECTIONS.TASKS).doc();
      await docRef.create({ email, title, description, dateExpire, stateTask });

      const savedDoc = await docRef.get();
      const task: Task = { id: savedDoc.id, ...savedDoc.data() } as Task;

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error: " + error });
    }
  }

  static async findAllByEmail(email: string, res: Response): Promise<void> {
    try {
      const query = db.collection(COLLECTIONS.TASKS).where("email", "==", email);
      const items = await query.get();

      const response: Task[] = items.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error: " + error });
    }
  }

  static async findById(id: string, res: Response): Promise<void> {
    try {
      const doc = await db.collection(COLLECTIONS.TASKS).doc(id).get();

      if (!doc.exists) {
        res.status(404).json({ message: "Task no encontrada" });
        return;
      }

      const task: Task = { id: doc.id, ...doc.data() } as Task;
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error: " + error });
    }
  }

  static async update(id: string, body: UpdateTaskDto, res: Response): Promise<void> {
    try {
      const { title, description, dateExpire, stateTask } = body;

      const updateData: Record<string, any> = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (dateExpire !== undefined) updateData.dateExpire = dateExpire;
      if (stateTask !== undefined) updateData.stateTask = stateTask;

      const docRef = db.collection(COLLECTIONS.TASKS).doc(`${id}`);
      await docRef.update(updateData);

      const updatedDoc = await docRef.get();
      const task: Task = { id: updatedDoc.id, ...updatedDoc.data() } as Task;

      res.status(201).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ha ocurrido un error: " + error });
    }
  }

  static async delete(id: string, res: Response): Promise<void> {
    try {
      await db.collection(COLLECTIONS.TASKS).doc(id).delete();
      res.status(204).json({ message: "Task removed" });
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error: " + error });
    }
  }
}
