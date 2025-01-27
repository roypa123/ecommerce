import { email } from '@users/controllers/user/get';
import express, { Router } from 'express';

const router: Router = express.Router();

const userRoutes = (): Router => {
  router.post('/email', email);
  return router;
};

export { userRoutes };




