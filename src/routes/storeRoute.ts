import { Router } from 'express';
import { createStore } from '../controllers/storeController';

const router = Router();

router
  .route('/')
  .post(createStore);

export default router;