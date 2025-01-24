import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignUp {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("ravi");
      const response: AxiosResponse = await authService.signUp(req.body);
      const { statusCode, status, message, token, results } = response.data;
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
