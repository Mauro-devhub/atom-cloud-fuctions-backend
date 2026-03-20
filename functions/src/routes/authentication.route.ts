import { Router } from "express";
import { default as db } from "../database";
import { ROUTE_MODULES } from "../route-modules";
import { COLLECTIONS } from "../collections";
import { JwtService } from "../service/jwt.service";

const router = Router();

const api = ROUTE_MODULES.prefix + ROUTE_MODULES.modules.auth;

router.post(`${api}/login`, async (req, res) => {
  try {
    const { email } = req.body;

    const snapshot = await db.collection(COLLECTIONS.USERS).where("email", "==", email).get();

    if (snapshot.empty) {
      res.status(404).json({message: "User not found"});
      return;
    }

    const userDoc = snapshot.docs[0];
    const token = JwtService.generateToken({uid: userDoc.id, email});

    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.post(`${api}/register`, async (req, res) => {
  try {
    const { email } = req.body;

    const snapshot = await db.collection(COLLECTIONS.USERS).where("email", "==", email).get();

    if (!snapshot.empty) {
      res.status(400).json({message: "User already exists"});
      return;
    }

    const docRef = db.collection(COLLECTIONS.USERS).doc();
    await docRef.create({ email });

    const token = JwtService.generateToken({uid: docRef.id, email});
    res.status(201).json({token});
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

export default router;