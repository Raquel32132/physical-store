import { Router } from 'express';
import { createStore, getAllStores, getStoreById } from '../controllers/storeController';

const router = Router();

router
  .route('/')
  .get(getAllStores)
  .post(createStore);

router
  .route('/:id')
  .get(getStoreById);

export default router;