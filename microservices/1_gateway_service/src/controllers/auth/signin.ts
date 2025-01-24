import { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { StatusCodes } from 'http-status-codes';

export class SignIn {
  public async read(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
      const response: AxiosResponse = await authService.signIn(req.body);
      const { statusCode,status , message, token, results } = response.data;
      req.session = { jwt: token ?? "" };
      res.status(statusCode).json({
        statusCode: statusCode ?? "",
        status: status ?? 200,
        message: message ?? "",
        results: results ?? "",
      });

    } catch (error) {
      next(error)
    }


  }

}
