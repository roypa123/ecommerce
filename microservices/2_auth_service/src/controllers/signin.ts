import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import { BadRequestError, IAuthDocument, IEmailMessageDetails, isEmail } from '@roy_p_a/ecommerce_shared';


class ErrorVO {
  status: number | undefined;
  status_code: string | undefined;
  message: String | undefined
  errors: string[] | undefined;

  constructor(status: number, status_code: string, message: String, errors: string | string[]) {
    this.status = status;
    this.status_code = status_code;
    this.message = message;
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}


export async function read(req: Request, res: Response): Promise<void> {
  const userData = req.body;

  console.log(userData.email);
  console.log(userData.password);
  console.log(userData.role);

  if (!userData.email && !userData.password && !userData.role) {
    console.log("manu")
    const validationError = new ErrorVO(
      400,
      "BAD REQUEST",
      "Missing required fields",
      "Missing required fields"
    );
    res.status(400).json(validationError);
    return;

  }

  console.log("pinu")

  res.status(200).json({
    status: 200,
    status_code: "",
    message: "",
    token: "",
    results: ""
  });

}
