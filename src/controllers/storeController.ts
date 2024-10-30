import { NextFunction, Request, Response } from 'express';
import * as storeService from '../services/storeService';
import { findNearbyStores } from '../services/addressService';
import { ERROR_TYPES } from '../constants/errors';

export const createStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Store created successfully.', 
      data: store
    });

  } catch (error: any) {
    next({
      type: ERROR_TYPES.REQUEST, 
      message: 'Error creating store.'
    });
  }
}

export const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stores = await storeService.getAllStores();
    res.status(200).json({
      status: 'success',
      data: stores
    });

  } catch (error: any) {
    next({
      type: ERROR_TYPES.REQUEST, 
      message: 'Error fetching stores.'
    });
  }
}

export const getStoreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const store = await storeService.getStoreById(req.params.id);

    if (!store) {
      return next({
        type: ERROR_TYPES.NOT_FOUND,
        message: 'Store not found.'
      });
    }

    res.status(200).json({
      status: 'success',
      data: store
    });

  } catch (error: any) {
    next({
      type: ERROR_TYPES.REQUEST,
      message: 'Error fetching store.'
    });
  }
}

export const updateStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedStore = await storeService.updateStore(req.params.id, req.body);

    if (!updatedStore) {
      return next({
        type: ERROR_TYPES.NOT_FOUND,
        message: 'Store not found.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Store updated successfully.',
      data: updatedStore
    })

  } catch (error: any) {
    next({
      type: ERROR_TYPES.REQUEST,
      message: 'Error updating store data.'
    });
  }
}

export const deleteStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedStore = await storeService.deleteStore(req.params.id);
  
    if (!deletedStore) {
      return next({
        type: ERROR_TYPES.NOT_FOUND,
        message: 'Store not found.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Store deleted successfully.'
    })
    
  } catch (error: any) {
    next({
      type: ERROR_TYPES.REQUEST,
      message: 'Error deleting store data.'
    });
  }
}

export const getNearbyStores = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const postalCode = req.params.postalCode as string;

  if (!postalCode) {
    res.status(400).json({ error: 'Postal code is required.' });
    return;
  }

  try {
    const allStores = await storeService.getAllStores();
    console.log(allStores);
    
    const nearbyStores = await findNearbyStores(postalCode, allStores);


    res.status(200).json({
      status: 'success',
      message: 'Nearby stores within 100km of postal code.',
      stores: nearbyStores
    })

  } catch (error: any) {
    res.status(500).json({
      status: 'failed',
      message: 'Error fetching nearby stores.',
      error: error.message
    })
  }
}