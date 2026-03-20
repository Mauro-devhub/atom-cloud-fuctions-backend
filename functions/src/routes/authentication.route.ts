import { Router } from "express";
import { default as db } from "../database";
import { ROUTE_MODULES } from "../route-modules";
import { COLLECTIONS } from "../collections";

const router = Router();

const api = ROUTE_MODULES.prefix + ROUTE_MODULES.modules.auth;

router.post(`${api}/login`, async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.collection(COLLECTIONS.USERS).where("email", "==", email).get();

    console.log("user", user);

    if (user) {
      res.status(404).json({message: "User not found"});
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.get(`${api}/register`, async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.collection(COLLECTIONS.USERS).where("email", "==", email).get();

    if (user) {
      res.status(400).json("User already exists");
    } else {
      const item = await db.collection(COLLECTIONS.USERS).doc().create({
        email
      });

      res.status(201).json(item);
    }
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

export default router;