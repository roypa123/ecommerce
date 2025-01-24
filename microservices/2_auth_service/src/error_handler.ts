import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  error: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  error: string;
  serializeErrors(): IError;
}


export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  comingFrom: string;
  error: string;


  constructor(message: string, comingFrom: string, error: string) {
    super(message);
    this.comingFrom = comingFrom;
    this.error = error;
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
      error: this.error
    }
  }
}

export class BadRequestError extends CustomError {
  statusCode = 400;
  status = 'error';

  constructor(message: string, comingFrom: string, error: string
  ) {
    super(message, comingFrom, error);
  }
}
