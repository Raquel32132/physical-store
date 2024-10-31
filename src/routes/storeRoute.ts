import { Router } from 'express';
import * as storeController from '../controllers/storeController';
import * as validateAddress from '../middlewares/validateAddress';
import * as validateStore from '../middlewares/validateStore';

const router = Router();

router
  .route('/')
  .get(storeController.getAllStores)
  .post(
    validateStore.validateStorePayload, 
    validateAddress.validatePostalCode, 
    storeController.createStore
  );

router
  .route('/:id')
  .get(storeController.getStoreById)
  .put(
    validateStore.validateStorePayload, 
    validateAddress.validatePostalCode, 
    storeController.updateStore
  )
  .delete(storeController.deleteStore);

router
  .route('/nearby/:postalCode')
  .get(storeController.getNearbyStores);

export default router;