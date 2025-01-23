import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';


export async function read(req: Request, res: Response): Promise<void> {
  const userData = req.body;
  console.log("dddd");

  res.status(200).json({
    status: userData.name,
    status_code: "",
    message: "",
    token: "",
    results: ""
  });

}
