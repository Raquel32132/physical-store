import { NextFunction, Request, Response } from 'express';
import * as storeService from '../services/storeService';
import { findNearbyStores } from '../services/addressService';
import { validatePostalCode } from '../utils/validatePostalCode';
import { logWithCorrelationId } from '../utils/logger';

export const createStore = async (req: Request, res: Response, next: NextFunction) => {
  const logger = logWithCorrelationId(req);
  try {
    logger.info('Creating store.')
    const store = await storeService.createStore(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Store created successfully.', 
      data: store
    });

  } catch (error: any) {
    logger.error(`Error creating store: ${error.message}`);
    next(error);
  }
}

export const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
  const logger = logWithCorrelationId(req);
  try {
    logger.info('Fetching stores.')
    const stores = await storeService.getAllStores();

    res.status(200).json({
      status: 'success',
      data: stores
    });

  } catch (error: any) {
    logger.error(`Error fetching stores: ${error.message}`);
    next(error);
  }
}

export const getStoreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const logger = logWithCorrelationId(req);
  try {
    logger.info(`Fetching store by id: ${req.params.id}`)
    const store = await storeService.getStoreById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: store
    });

  } catch (error: any) {
    logger.error(`Error fetching store: ${error.message}`);
    next(error);
  }
}

export const updateStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const logger = logWithCorrelationId(req);
  try {
    logger.info(`Updating store by id: ${req.params.id}`);
    const updatedStore = await storeService.updateStore(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Store updated successfully.',
      data: updatedStore
    })

  } catch (error: any) {
    logger.error(`Error updating store: ${error.message}`);
    next(error);
  }
}

export const deleteStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const logger = logWithCorrelationId(req);
  try {
    logger.info(`Deleting store by id: ${req.params.id}`);
    await storeService.deleteStore(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Store deleted successfully.'
    })
    
  } catch (error: any) {
    logger.error(`Error deleting store: ${error.message}`);
    next(error);
  }
}

export const getNearbyStores = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const logger = logWithCorrelationId(req);

  const postalCode = req.params.postalCode;
  await validatePostalCode(postalCode);

  const maxDistance = Number(req.query.distance) || 100;

  try {
    logger.info(`Fetching stores near postal code: ${postalCode}`);
    const allStores = await storeService.getAllStores();
    const nearbyStores = await findNearbyStores(postalCode, allStores, maxDistance);

    res.status(200).json({
      status: 'success',
      message: `Nearby stores within ${maxDistance}km of postal code.`,
      stores: nearbyStores
    });

  } catch (error: any) {
    logger.error(`Error fetching stores by postal code: ${error.message}`);
    next(error);
  }
};

