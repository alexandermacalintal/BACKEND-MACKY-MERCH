import express from 'express';

import { PORT } from './config/env.js';

import productRouter from './routes/products.routes.js';

import db from './db.js';

import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



export default app;