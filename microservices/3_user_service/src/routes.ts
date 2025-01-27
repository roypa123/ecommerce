import { Application } from "express";

const USER_BASE_PATH = '/api/v1/user';

const appRoutes = (app: Application): void => {
  app.use(USER_BASE_PATH, userRoutes());
};

export { appRoutes };
