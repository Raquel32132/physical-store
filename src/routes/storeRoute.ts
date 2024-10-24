import { Router } from 'express';
import { createStore, deleteStore, getAllStores, getStoreById, updateStore } from '../controllers/storeController';

const router = Router();

router
  .route('/')
  .get(getAllStores)
  .post(createStore);

router
  .route('/:id')
  .get(getStoreById)
  .patch(updateStore)
  .delete(deleteStore);

export default router;