import express from 'express';

import { PORT } from './config/env.js';

import productRouter from './routes/products.routes.js';

import db from './db.js';

import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send({title: 'Macky Merch API', note: 'Welcome to the Macky Merch API!'});
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



export default app;