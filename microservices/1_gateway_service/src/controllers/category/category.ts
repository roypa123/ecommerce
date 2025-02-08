import { categoryService } from '@gateway/services/api/category.service';
import { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Categories {

  public async category(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const response: AxiosResponse = await categoryService.category(req.body);
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




}
