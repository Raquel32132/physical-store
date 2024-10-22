import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './mongoConnection';

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3000

connectDatabase();

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', (err: any) => {
  console.error('Unhandled Rejection! Shutting down...', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err: any) => {
  console.error('Uncaught Exception! Shutting down...', err.name, err.message);
  process.exit(1);
});