import { Router } from 'express';
import { createStore, deleteStore, getAllStores, getNearbyStores, getStoreById, updateStore } from '../controllers/storeController';

const router = Router();

router
  .route('/')
  .get(getAllStores)
  .post(createStore);

router
  .route('/:id')
  .get(getStoreById)
  .put(updateStore)
  .delete(deleteStore);

router
  .route('/nearby/:postalCode')
  .get(getNearbyStores);

export default router;