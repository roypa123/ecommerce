import { read } from '@auth/controllers/signin';
import express, { Router } from 'express';


const router: Router = express.Router();

export function authRoutes(): Router {
  
  router.post('/signin', read);
  return router;
}
