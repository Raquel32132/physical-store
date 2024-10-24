import { Router } from 'express';
import { createStore, getAllStores, getStoreById, updateStore } from '../controllers/storeController';

const router = Router();

router
  .route('/')
  .get(getAllStores)
  .post(createStore);

router
  .route('/:id')
  .get(getStoreById)
  .patch(updateStore);

export default router;