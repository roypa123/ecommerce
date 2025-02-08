import { createCategory } from '@category/controllers/category/post';
import express, { Router } from 'express';
import upload  from '../configuration/multer_config';

const router: Router = express.Router();

const categoryRoutes = (): Router => {
  router.post('/category',
    upload.single('image'),
    (req,res,next)=>{
    console.log("Request Body:", req.body);
    console.log("File Received:", req.file);

     next();
  },

  createCategory);
  return router;
};

export { categoryRoutes };




