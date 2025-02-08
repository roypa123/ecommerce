import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
import helmet from "helmet";
import hpp from "hpp";
import http from 'http';
import cors from 'cors';
import { config } from "./config";
import compression from "compression";
import { verify } from "jsonwebtoken";
import { appRoutes } from "./routes";
import { CustomError, IErrorResponse } from "./error_handler";
import { Channel } from 'amqplib';
import { createConnection } from './queues/connection';
import { consumeAuthEmailMessages } from './queues/user.consumer';

const SERVER_PORT = 4003;

export function start(app: Application): void {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  startQueues();
  usersErrorHandler(app);
  startServer(app);
};

const securityMiddleware = (app: Application): void => {
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })
  );
};

const standardMiddleware = (app: Application): void => {
  app.use(compression());
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ extended: true, limit: '200mb' }));
};

const routesMiddleware = (app: Application): void => {
  appRoutes(app);
};

async function startQueues(): Promise<void> {
  const emailChannel: Channel = await createConnection() as Channel;
  await consumeAuthEmailMessages(emailChannel);
}



const usersErrorHandler = (app: Application): void => {
  app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
  });
};

const startServer = (app: Application): void => {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.log(`User server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      console.log(`User server running on port ${SERVER_PORT}`)
    });
  } catch (error) {
    console.log(`error, UserService startServer() method error:, ${error}`)
  }
};



