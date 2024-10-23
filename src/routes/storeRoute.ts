import { Router } from 'express';
import { createStore, getAllStores } from '../controllers/storeController';

const router = Router();

router
  .route('/')
  .get(getAllStores)
  .post(createStore);

export default router;