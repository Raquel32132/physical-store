import { MongoClient } from "mongodb";

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const dbName = process.env.MONGODB_DATABASE;

export const connectToMongo = async () => {
  const client = new MongoClient(url);
  await client.connect();

  console.log('Connected to MongoDB.');
  return client.db(dbName);
};