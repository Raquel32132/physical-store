import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid';

export const correlationId = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  req.headers['x-correlation-id'] = correlationId;

  res.setHeader('X-Correlation-Id', correlationId);

  next();
}