import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
import http from 'http';
import compression from 'compression';
import { appRoutes } from './routes';

import { config } from '@auth/config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import { IErrorResponse, CustomError } from '@auth/error_handler';


const SERVER_PORT = 4001;

export function start(app: Application): void {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  authErrorHandler(app);
  startServer(app);
}

function securityMiddleware(app: Application): void {
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(helmet());
  app.use(cors({
    origin: config.API_GATEWAY_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }));
}

function standardMiddleware(app: Application): void {
  app.use(compression());
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ extended: true, limit: '200mb' }))
}

function routesMiddleware(app: Application): void {
  appRoutes(app);
}


function authErrorHandler(app: Application): void {
  app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
  });
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.log(`Authentication server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Authentication server running on port ${SERVER_PORT}`)
    });
  } catch (error) {
    console.log(`error, AuthService startServer() method error:, ${error}`)
  }
}












// private async startServer(app: Application): Promise<void> {
//   try {
//     const httpServer: http.Server = new http.Server(app);
//     //log.info(`Authentication server has started with process id ${process.pid}`);
//     console.log(`Authentication server has started with process id ${process.pid}`);
//   } catch (error) {
//     //log.log('error', 'AuthService startServer() method error:', error);
//     console.log(`error AuthService startServer() method error:, ${error}`);

//   }
// }








