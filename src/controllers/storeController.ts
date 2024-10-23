import { Request, Response } from 'express';
import * as storeService from '../services/storeService';

export const createStore = async (req: Request, res: Response) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json({
      message: 'Store created successfully.', store
    });

  } catch (error: any) {
    res.status(400).json({
      message: 'Error creating store.', error: error?.message
    });
  }
}