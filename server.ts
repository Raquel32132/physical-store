import express from 'express';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log('Server running on port 3000!')
});