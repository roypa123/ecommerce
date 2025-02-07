import { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { StatusCodes } from 'http-status-codes';

export class SignIn {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
      const response: AxiosResponse = await authService.signIn(req.body);
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
