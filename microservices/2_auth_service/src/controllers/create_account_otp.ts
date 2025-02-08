import transporter from '@auth/configuration/mailerconfig';
import { BadRequestError } from '@auth/error_handler';
import HelperFunction from '@auth/helpers/helperfunction';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import ErrorVO from '@auth/responses/errorvo';
import RequestVO from '@auth/responses/requestvo';
import ResponseVO from '@auth/responses/responsevo';
import { authChannel } from '@auth/server';
import { createAccountOtp1, createAuthUser, userExists } from '@auth/services/auth.service';
import { Request, Response, NextFunction } from 'express';

export async function createAccountOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
  console.log("tinu");

  try {
    const userData = req.body;

    if (!userData.email || !userData.otp) {
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', 'Missing required fields')
    }

    const isValidEmail = await HelperFunction.isValidEmail(userData.email);

    if (!isValidEmail) {
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', "Invalid email")
    }

    const isValidOtp = await HelperFunction.isValidOTP(
      userData.otp
    );
    if (!isValidOtp) {
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', "Invalid OTP")
    }

    const userExists1 = await userExists(userData.email);
    if (!userExists1) {
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', "Invalid email and password");
    }

    const requestVO = new RequestVO({
      data: userData,
      pagination: null,
      filter: null,
      sortBy: null,
    });

    const result = await createAccountOtp1(requestVO.data);
    const successResponse = new ResponseVO(200, "Success", "Success", result);
    console.log(successResponse)
    res.status(200).json(successResponse);
  } catch (error) {
    next(error)
  }
}
