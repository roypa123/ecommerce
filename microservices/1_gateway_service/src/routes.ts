import { Application } from "express";
import { authRoutes } from "./routes/auth";
import { categoryRoutes } from "./routes/category";

const BASE_PATH = '/api/gateway/v1';

export const appRoutes = (app: Application) => {
  app.use(BASE_PATH, authRoutes.routes())
  app.use(BASE_PATH, categoryRoutes.routes())
}
