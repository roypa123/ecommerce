import express, { Express } from 'express';
import { config } from '@auth/config';
import { start } from '@auth/server';

const initialize = (): void => {
  const app: Express = express();
  start(app);
}

initialize();

