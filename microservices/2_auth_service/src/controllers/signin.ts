import { BadRequestError } from '@auth/error_handler';
import { Request, Response, NextFunction } from 'express';



export async function read(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    const userData = req.body;
    if (userData.role === '') {
      console.log('manu')
      throw new BadRequestError('Invalid credentials',
                                'Auth microservice: SignIn read() method error',
                                'Invalid credentials')
    }

    console.log("pinu")

    res.status(200).json({
      statusCode: 200,
      status: "SUCCESS",
      message: "",
      token: "",
      results: ""
    });

  } catch (error) {
    next(error)
  }

}
