import express from 'express';
import storeRouter from './src/routes/storeRoute';
import { errorHandler } from './src/middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/v1/stores', storeRouter);
app.use(errorHandler);

export default app;