import { BadRequestError } from '@auth/error_handler';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { createAuthUser } from '@auth/services/auth.service';
import { Request, Response, NextFunction } from 'express';

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    const userData = req.body;
    if (userData.role === '') {
      console.log('manu')
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', 'Invalid credentials')
    }

    const message = { text: 'Hello from Microservice 1' };
    const response = await publishDirectMessage(
      authChannel,
      'auth_user',
      'auth_user',
      JSON.stringify(message),
      'authentication from auth to user-service'
    );
    console.log('Response from Service B:', response);

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
