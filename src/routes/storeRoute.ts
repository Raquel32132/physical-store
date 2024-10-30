import { Router } from 'express';
import { createStore, deleteStore, getAllStores, getNearbyStores, getStoreById, updateStore } from '../controllers/storeController';
import { validateAddressPayload, validatePostalCode } from '../middlewares/validateAddress';

const router = Router();

router
  .route('/')
  .get(getAllStores)
  .post(validateAddressPayload, validatePostalCode, createStore);

router
  .route('/:id')
  .get(getStoreById)
  .put(validatePostalCode, updateStore)
  .delete(deleteStore);

router
  .route('/nearby/:postalCode')
  .get(validateAddressPayload, getNearbyStores);

export default router;