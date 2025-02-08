import { BadRequestError } from '@auth/error_handler';
import HelperFunction from '@auth/helpers/helperfunction';
import RequestVO from '@auth/responses/requestvo';
import ResponseVO from '@auth/responses/responsevo';
import { loginUser, userExists, userStatus } from '@auth/services/auth.service';
import { Request, Response, NextFunction } from 'express';



export async function read(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userData = req.body;
  try {
    console.log("dsdsds")
    if (!userData.email || !userData.password) {
      throw new BadRequestError('Invalid credentials',
        'Auth microservice: SignIn read() method error',
        'Missing required fields')
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

    if (!userExists1) {
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', "Invalid email and password");
    }

    const isStatus = await userStatus(userData.email);

    if(isStatus.status == 0){

      const result = {
        "redirectTo":"create_aacount_otp_section",
        "email":userData.email
      }
      const successResponse = new ResponseVO(200, "Success", "Success", result);
      res.status(200).json(successResponse);

    }

    const requestVO = new RequestVO({
      data: userData,
      pagination: null,
      filter: null,
      sortBy: null,
    });

    console.log("sdsdsds")

    const result = await loginUser(requestVO.data);
    const successResponse = new ResponseVO(200, "Success", "Success", result);
    res.status(200).json(successResponse);

    
  } catch (error) {
    next(error)
  }

}
