import { Router } from "express";
import { default as db } from "../database";
import { ROUTE_MODULES } from "../route-modules";
import { COLLECTIONS } from "../collections";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { Task } from "../entities/task.entity";

const router = Router();

const api = ROUTE_MODULES.prefix + ROUTE_MODULES.modules.tasks;

router.use(api, authMiddleware);

router.post(api, validationMiddleware(CreateTaskDto), async (req, res) => {
  try {
    const { email } = (req as any).user;
    const { title, description, dateExpire, stateTask } = req.body;

    const docRef = db.collection(COLLECTIONS.TASKS).doc();
    await docRef.create({ email, title, description, dateExpire, stateTask });

    const savedDoc = await docRef.get();
    const task: Task = { id: savedDoc.id, ...savedDoc.data() } as Task;

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.get(api, async (req, res) => {
  try {
    const query = db.collection(COLLECTIONS.TASKS).where("email", "==", (req as any).user.email);
    const items = await query.get();

    const response: Task[] = items.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Task));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.get(`${api}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTIONS.TASKS).doc(id).get();

    if (!doc.exists) {
      res.status(404).json({ message: "Task no encontrada" });
      return;
    }

    const task: Task = { id: doc.id, ...doc.data() } as Task;
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.patch(`${api}/:id`, validationMiddleware(UpdateTaskDto), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dateExpire, stateTask } = req.body;

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
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.delete(`${api}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    db.collection(COLLECTIONS.TASKS).doc(id).delete();
    res.status(204).json({message: "Task removed"});
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

export default router;
