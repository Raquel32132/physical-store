import { Request, Response } from 'express';

export const errorHandler = (error: any, req: Request, res: Response) => {
  console.error(error);

  res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });
};