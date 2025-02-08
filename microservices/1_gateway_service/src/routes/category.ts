import express, { Router } from 'express';
import { Categories } from '@gateway/controllers/category/category';

class CategoryRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    
    this.router.post('/category/category', Categories.prototype.category);
    return this.router;
  }
}

export const categoryRoutes: CategoryRoutes = new CategoryRoutes();
