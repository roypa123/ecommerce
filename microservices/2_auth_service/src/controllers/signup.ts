import { BadRequestError } from '@auth/error_handler';
import { createAuthUser } from '@auth/services/auth.service';
import { Request, Response, NextFunction } from 'express';

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    const userData = req.body;
    if (userData.role === '') {
      console.log('manu')
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', 'Invalid credentials')
    }


    // await createAuthUser("ddfdfd");

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
