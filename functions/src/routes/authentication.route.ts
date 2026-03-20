import { Router } from "express";
import { default as db } from "../database";
import { ROUTE_MODULES } from "../route-modules";
import { COLLECTIONS } from "../collections";
import { JwtService } from "../service/jwt.service";
import { validationMiddleware } from "../middleware/validation.middleware";
import { AuthDto } from "../dtos/auth.dto";
import { User } from "../entities/user.entity";

const router = Router();

const api = ROUTE_MODULES.prefix + ROUTE_MODULES.modules.auth;

router.use(api, validationMiddleware(AuthDto));

router.post(`${api}/login`, async (req, res) => {
  try {
    const { email } = req.body;

    const emailtrsm: string = email.toLowerCase();

    const snapshot = await db.collection(COLLECTIONS.USERS).where("email", "==", emailtrsm).get();

    if (snapshot.empty) {
      res.status(404).json({message: "User not found"});
      return;
    }

    const userDoc = snapshot.docs[0];
    const user: User = { id: userDoc.id, ...userDoc.data() } as User;
    const token = JwtService.generateToken({ uid: user.id, email: user.email });

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

router.post(`${api}/register`, async (req, res) => {
  try {
    const { email } = req.body;

    const emailtrsm: string = email.toLowerCase();

    const snapshot = await db.collection(COLLECTIONS.USERS).where("email", "==", emailtrsm).get();

    if (!snapshot.empty) {
      res.status(400).json({message: "User already exists"});
      return;
    }

    const docRef = db.collection(COLLECTIONS.USERS).doc();
    await docRef.create({ email: emailtrsm });

    const savedDoc = await docRef.get();
    const user: User = { id: savedDoc.id, ...savedDoc.data() } as User;
    const token = JwtService.generateToken({ uid: user.id, email: user.email });

    res.status(201).json({ email: user.email, token });
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error: " + error})
  }
})

export default router;