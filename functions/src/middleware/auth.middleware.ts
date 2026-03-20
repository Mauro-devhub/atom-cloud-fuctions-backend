import {Request, Response, NextFunction} from "express";
import {JwtService} from "../service/jwt.service";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({message: "Token no proporcionado"});
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = JwtService.verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({message: "Token inválido o expirado"});
  }
}
