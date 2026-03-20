import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export function validationMiddleware(dtoClass: new () => object) {
  return async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body) {
      res.status(400).json({ message: "Body is required" });
      return;
    }

    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance, { whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      const messages = errors.flatMap((error) =>
        Object.values(error.constraints || {})
      );
      res.status(400).json({ errors: messages });
      return;
    }

    req.body = dtoInstance;
    next();
  };
}
