import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '@gateway/services/api/auth.service';

export class SignIn {
  public async read(req: Request, res: Response): Promise<void>{

    const response: AxiosResponse = await authService.signIn(req.body);
    //const {message } = response.data;
    const {test} = response.data;

    //res.status(StatusCodes.OK).json({message});
    res.status(StatusCodes.OK).json({test});
  }

}
