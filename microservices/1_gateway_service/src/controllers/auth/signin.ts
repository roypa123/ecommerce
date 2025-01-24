import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { authService } from '@gateway/services/api/auth.service';
import { StatusCodes } from 'http-status-codes';

export class SignIn {
  public async read(req: Request, res: Response): Promise<void> {

    try {
      const response: AxiosResponse = await authService.signIn(req.body);

      const { status, status_code, message, token, results } = response.data;
      req.session = { jwt: token ?? "" };
      res.status(status).json({
        status: status,
        status_code: status_code ?? "",
        message: message ?? "",
        results: results ?? "",
      });

    } catch (error: any) {
      console.log(error)

      if (error.response) {
        const { status, status_code, message, errors } = error.response.data;
        res.status(status_code ?? StatusCodes.INTERNAL_SERVER_ERROR).json({ status, status_code, message, errors });
      } else {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: "500",
          status: "INTERNAL SERVER ERROR",
          message: "An unexpected error occurred",
          errors: ["An unexpected error occurred"],
        });
      }

    }





  }

}
