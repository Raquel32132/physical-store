import express from 'express';
import storeRouter from './src/routes/storeRoute';
import { HTTPErrorHandler } from './src/middlewares/HTTPErrorHandler';

const app = express();

app.use(express.json());

app.use('/api/v1/stores', storeRouter);

app.use(HTTPErrorHandler);

export default app;