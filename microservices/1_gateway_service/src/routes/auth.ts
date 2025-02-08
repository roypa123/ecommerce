import express, { Router } from 'express';
import { SignIn } from '@gateway/controllers/auth/signin';
import { SignUp } from '@gateway/controllers/auth/signup';


class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignUp.prototype.create);
    this.router.post('/auth/create_account_otp', SignUp.prototype.create_account_otp);
    this.router.post('/auth/signin', SignIn.prototype.read);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
