import { Application } from "express";
import { categoryRoutes } from "./routes/category";

const CATEGORY_BASE_PATH = '/api/v1/category';

const appRoutes = (app: Application): void => {
  app.use(CATEGORY_BASE_PATH, categoryRoutes());
};

export { appRoutes };
