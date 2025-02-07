import { BadRequestError } from '@auth/error_handler';
import HelperFunction from '@auth/helpers/helperfunction';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import ErrorVO from '@auth/responses/errorvo';
import RequestVO from '@auth/responses/requestvo';
import { authChannel } from '@auth/server';
import { createAuthUser, userExists } from '@auth/services/auth.service';
import { Request, Response, NextFunction } from 'express';

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userData = req.body;

    if (!userData.email ||
      !userData.name ||
      !userData.password ||
      !userData.role) {
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', 'Invalid credentials')
    }

    const isValidEmail = await HelperFunction.isValidEmail(userData.email);

    if (!isValidEmail) {
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', "Invalid email")
    }

    const isValidPassword = await HelperFunction.isValidPassword(
      userData.password
    );

    if (!isValidPassword) {
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', "Invalid password")
    }



    const userExists1 = await userExists(userData.email);

    if (userExists1) {
      const conflictError = new ErrorVO(
        409,
        "BAD REQUEST",
        "User already exists",
        "User already exists"
      );
      res.status(409).json(conflictError);
    }

    const requestVO = new RequestVO({
      data: userData,
      pagination: null,
      filter: null,
      sortBy: null,
    });

    const result = await createAuthUser(requestVO.data);

    console.log("ppppppp");
    console.log(result);

  } catch (error) {
    next(error)
  }
}



// const message = { text: 'Hello from Microservice 1' };
// const response = await publishDirectMessage(
//   authChannel,
//   'auth_user',
//   'auth_user',
//   JSON.stringify(message),
//   'authentication from auth to user-service'
// );
// console.log('Response from Service B:', response);

// res.status(200).json({
//   statusCode: 200,
//   status: "SUCCESS",
//   message: "",
//   token: "",
//   results: ""
// });
