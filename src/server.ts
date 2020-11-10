import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './shared/http/routes';
import AppError from './shared/errors/AppError';

import './shared/database';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'message',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server Started on port 3333!');
});
