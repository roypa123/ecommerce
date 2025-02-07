import transporter from '@auth/configuration/mailerconfig';
import { BadRequestError } from '@auth/error_handler';
import HelperFunction from '@auth/helpers/helperfunction';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import ErrorVO from '@auth/responses/errorvo';
import RequestVO from '@auth/responses/requestvo';
import ResponseVO from '@auth/responses/responsevo';
import { authChannel } from '@auth/server';
import { createAuthUser, userExists } from '@auth/services/auth.service';
import { Request, Response, NextFunction } from 'express';

export async function createAccountOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
  console.log("tinu");

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
      throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', "User already exists");
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

    const mailOptions = {
      from: "roypa81130@gmail.com",
      to: result.email1,
      subject: "OTP for create account",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP for create account</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0,0,0,0.1);
              }
              h1 {
                  color: #007bff;
              }
              p {
                  margin-bottom: 20px;
              }
              .token {
                  font-weight: bold;
                  color: #007bff;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Create account for Mobikul App</h1>
              <p>Hello,</p>
              <p>We have received a request for OTP for creating account in Mobikul App. To proceed with the creating account, please use the following code:</p>
              <p class="token">${result.otp2}</p>
              <p>If you didn't request a OTP for creating account, you can safely ignore this email.</p>
              <p>Thank you!</p>
          </div>
      </body>
      </html>
  `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new BadRequestError('Invalid credentials', 'Auth microservice: SignIn read() method error', "Invalid email and password");
      } else {
        const successResponse = new ResponseVO(
          200,
          "Success",
          "Otp sent successfully",
          "Otp sent successfully"
        );
        res.status(200).json(successResponse);
      }
    });






  } catch (error) {
    next(error)
  }
}
