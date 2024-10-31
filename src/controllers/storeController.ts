import { NextFunction, Request, Response } from 'express';
import * as storeService from '../services/storeService';
import { findNearbyStores } from '../services/addressService';
import { validatePostalCode } from '../utils/validatePostalCode';

export const createStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Store created successfully.', 
      data: store
    });

  } catch (error) {
    next(error);
  }
}

export const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stores = await storeService.getAllStores();
    res.status(200).json({
      status: 'success',
      data: stores
    });

  } catch (error) {
    next(error);
  }
}

export const getStoreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const store = await storeService.getStoreById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: store
    });

  } catch (error) {
    next(error);
  }
}

export const updateStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedStore = await storeService.updateStore(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Store updated successfully.',
      data: updatedStore
    })

  } catch (error) {
    next(error);
  }
}

export const deleteStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await storeService.deleteStore(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Store deleted successfully.'
    })
    
  } catch (error) {
    next(error);
  }
}

export const getNearbyStores = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const postalCode = req.params.postalCode;
  const maxDistance = Number(req.query.distance) || 100;

  try {
    const allStores = await storeService.getAllStores();
    const nearbyStores = await findNearbyStores(postalCode, allStores, maxDistance);

    res.status(200).json({
      status: 'success',
      message: `Nearby stores within ${maxDistance}km of postal code.`,
      stores: nearbyStores
    });

  } catch (error) {
    next(error);
  }
};

