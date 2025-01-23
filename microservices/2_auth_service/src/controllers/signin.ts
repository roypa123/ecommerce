import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export async function read(req: Request, res: Response): Promise<void> {
  console.log("pinupinu");
  res.status(StatusCodes.OK).json();
}
