import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import corsOptions from './config/corsOptions';

import * as middlewares from './middlewares';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Welocme!',
  });
});

const headers = {
  'x-api-key': process.env.API_KEY!,
};

app.get<{}, {}>('/search', async (req, res) => {
  const response = await fetch('https://api.thecatapi.com/v1/breeds', {
    method: 'get',
    headers,
  });

  const data = await response.json();
  return res.json(data);
});

app.get<{}, {}>('/most-searched', async (req, res) => {
  return res.json(['bali', 'orie', 'bure', 'mcoo']);
});

app.get<{}, {}>('/search-by-breed', async (req, res) => {
  console.log(req.body.id);
  const response = await fetch(
    `https://api.thecatapi.com/v1/breeds/search?q=${req.body.id}`,
    {
      method: 'get',
      headers,
    }
  );

  const data = await response.json();
  return res.json(data);
});

app.get<{}, {}>('/images/:id', async (req, res) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=8&breed_ids=${req.body.id}`,
    {
      method: 'get',
      headers,
    }
  );

  const data = await response.json();
  return res.json(data);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
