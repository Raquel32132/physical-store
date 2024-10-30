import { Router } from 'express';
import { createStore, deleteStore, getAllStores, getNearbyStores, getStoreById, updateStore } from '../controllers/storeController';
import { validatePostalCode } from '../middlewares/validateAddress';

const router = Router();

router
  .route('/')
  .get(getAllStores)
  .post(validatePostalCode, createStore);

router
  .route('/:id')
  .get(getStoreById)
  .put(validatePostalCode, updateStore)
  .delete(deleteStore);

router
  .route('/nearby/:postalCode')
  .get(getNearbyStores);

export default router;