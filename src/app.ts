/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import corsOptions from './config/corsOptions';

import * as middlewares from './middlewares';
import MessageResponse from './interfaces/MessageResponse';
import axios from 'axios';

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
  const { data } = await axios.get('https://api.thecatapi.com/v1/breeds', {
    method: 'get',
    headers,
  });

  return res.json(data);
});

app.get<{ count: string }, {}>('/most-searched/:count', async (req, res) => {
  const mostSearched = [
    'toyg',
    'bali',
    'orie',
    'abys',
    'soma',
    'amau',
    'bslo',
    'java',
    'norw',
    'tvan',
  ];

  const pick = parseInt(req.params.count) == 4 ? 4 : 10;
  return res.json(mostSearched.slice(0, pick));
});

app.get<{ id: string }, {}>('/breed/:id', async (req, res) => {
  console.log(req.params, 'breddd');
  const { data } = await axios.get(
    `https://api.thecatapi.com/v1/breeds/search?q=${req.params.id}`,
    {
      method: 'get',
      headers,
    },
  );

  return res.json(data);
});

app.get<{ id: string }, {}>('/images/:id', async (req, res) => {
  const { data } = await axios.get(
    `https://api.thecatapi.com/v1/images/search?limit=8&breed_ids=${req.params.id}`,
    {
      method: 'get',
      headers,
    },
  );

  return res.json(data);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
