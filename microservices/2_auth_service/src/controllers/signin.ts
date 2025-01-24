import { BadRequestError } from '@auth/error_handler';
import { Request, Response , NextFunction} from 'express';



export async function read(req: Request, res: Response, next: NextFunction): Promise<void> {
  try{

  const userData = req.body;
  console.log("ttt")

  if (userData.role === '') {
    console.log('manu')
    throw  new BadRequestError('Invalid credentials', 'Invalid credentials')

  }

  console.log("pinu")

  res.status(200).json({
    status: 200,
    status_code: "",
    message: "",
    token: "",
    results: ""
  });

}catch(error){
  next(error)
}

}
