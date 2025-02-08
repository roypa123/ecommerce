import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignUp {
  
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const response: AxiosResponse = await authService.signUp(req.body);
      console.log(response.data);
      const { status_code, status, message, data } = response.data;
      // req.session = { jwt: token ?? "" };
      res.status(status_code).json({
        status_code: status_code ?? "",
        status: status ?? 200,
        message: message ?? "",
        results: data ?? "",
      });
    } catch (error) {
      next(error)
    }
  }

  public async create_account_otp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("create account otp");
      const response: AxiosResponse = await authService.create_account_otp(req.body);
      console.log(response.data);
      const { status_code, status, message, data } = response.data;
      req.session = { jwt: data.access_token ?? "" };
      res.status(status_code).json({
        status_code: status_code ?? "",
        status: status ?? 200,
        message: message ?? "",
        results: data ?? "",
      });
    } catch (error) {
      next(error)
    }
  }


}
