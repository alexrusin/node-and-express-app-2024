import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validateRequest(schema: ObjectSchema) {
  return async function validator(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const validated = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body = validated;
    next();
  };
}
