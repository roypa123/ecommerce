import express, { Router } from 'express';
import { SignIn } from '@gateway/controllers/auth/signin';
import { SignUp } from '@gateway/controllers/auth/signup';
import { Signout } from '@gateway/controllers/auth/signout';
import { VerifyEmail } from '@gateway/controllers/auth/verify-email';
import { VerifyOTP } from '@gateway/controllers/auth/verify-otp';
import { Password } from '@gateway/controllers/auth/password';


class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignUp.prototype.create);

   /**
    * @swagger
    * /api/gateway/v1/auth/signin:
    *   get:
    *     summary: Example endpoint
    *     responses:
    *       200:
    *         description: Successful response
    */
    this.router.post('/auth/signin', SignIn.prototype.read);



    this.router.post('/auth/signout', Signout.prototype.update);
    this.router.put('/auth/verify-email', VerifyEmail.prototype.update);
    this.router.put('/auth/verify-otp/:otp', VerifyOTP.prototype.update);
    this.router.put('/auth/forgot-password', Password.prototype.forgotPassword);
    this.router.put('/auth/reset-password/:token', Password.prototype.resetPassword);
    this.router.put('/auth/change-password', Password.prototype.changePassword);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
