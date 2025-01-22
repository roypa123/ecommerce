import express, { Router } from 'express';
import { SignIn } from '@gateway/controllers/auth/signin';


class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signin', SignIn.prototype.read);
    return this.router;
  }

}

export const authRoutes: AuthRoutes = new AuthRoutes();
