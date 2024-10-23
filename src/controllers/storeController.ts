import { Request, Response } from 'express';
import * as storeService from '../services/storeService';

export const createStore = async (req: Request, res: Response) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Store created successfully.', 
      data: store
    });

  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: 'Error creating store.', 
      error: error.message
    });
  }
}

export const getAllStores = async (req: Request, res: Response) => {
  try {
    const stores = await storeService.getAllStores();
    res.status(200).json({
      status: 'success',
      data: stores
    });

  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: 'Error fetching stores.', 
      error: error.message
    })
  }
}

export const getStoreById = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await storeService.getStoreById(req.params.id);

    if (!store) {
      res.status(404).json({
        status: 'failed',
        message: 'Store not found.'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: store
    });

  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: 'Error fetching store.',
      error: error.message
    })
  }
}

export const updateStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedStore = await storeService.updateStore(req.params.id, req.body);

    if (!updateStore) {
      res.status(404).json({
        status: 'failed',
        message: 'Store not found.'
      })
      return;
    }

    res.status(200).json({
      status: 'failed',
      message: 'Store updated successfully.',
      data: updatedStore
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: 'Error updating store data.',
      error: error.message
    })
  }
}