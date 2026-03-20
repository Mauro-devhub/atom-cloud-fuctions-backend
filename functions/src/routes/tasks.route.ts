import { Router } from "express";
import { default as db } from "../database";
import { ROUTE_MODULES } from "../route-modules";
import { COLLECTIONS } from "../collections";
import { authMiddleware } from "../middleware/auth.middleware";

const api = ROUTE_MODULES.prefix + ROUTE_MODULES.modules.tasks;

const router = Router();

router.use(ROUTE_MODULES.prefix + ROUTE_MODULES.modules.tasks, authMiddleware);

router.post(api, async (req, res) => {
  try {
    const { email, title, description, dateExpire, stateTask } = req.body;

    const item = await db.collection(COLLECTIONS.TASKS).doc().create({
      email,
      title,
      description,
      dateExpire,
      stateTask
    })

    console.log("data", item);

    res.status(204).json(item);
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.get(api, async (req, res) => {
  try {
    const query = db.collection(COLLECTIONS.TASKS);
    const items = await query.get();
    
    const response = items.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });

    console.log("data", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.get(`${api}/:id`, async (req, res) => {
  const { id } = req.params;
  
  try {
    const item = await db.collection(COLLECTIONS.TASKS).doc(id).get();
    console.log("data", item.data());
    res.status(200).json(item.data());
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.put(`${api}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dateExpire, stateTask } = req.body;

    const item = await db.collection(COLLECTIONS.TASKS).doc(id).update({
      title,
      description,
      dateExpire,
      stateTask
    })

    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.delete(`${api}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    db.collection(COLLECTIONS.TASKS).doc(id).delete();
    res.status(200).json({message: "Task removed"});
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

export default router;