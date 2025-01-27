import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
import http from 'http';
import compression from 'compression';
import { appRoutes } from './routes';
import { config } from '@auth/config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import { IErrorResponse, CustomError } from '@auth/error_handler';
import { Channel } from 'amqplib';
import { createConnection } from '@auth/queues/connection';
import { Logger } from 'winston';
import { winstonLogger } from './logger';


const SERVER_PORT = 4001;

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authenticationServer', 'debug');

export let authChannel: Channel;

export function start(app: Application): void {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  startQueues();
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

async function startQueues(): Promise<void> {
  authChannel = await createConnection() as Channel;
}


function authErrorHandler(app: Application): void {
  app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    log.log('error', `AuthService ${error.comingFrom}:`, error);
    if (error instanceof CustomError) {
      res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
  });
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);

    log.info(`Authentication server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {

      log.info(`Authentication server running on port ${SERVER_PORT}`);
    });
  } catch (error) {

    log.log('error', 'AuthService startServer() method error:', error);
  }
}





















