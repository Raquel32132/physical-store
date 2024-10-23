import express from 'express';
import storeRouter from './src/routes/storeRoute';

const app = express();

app.use(express.json());

app.use('/api/v1/stores', storeRouter);

export default app;