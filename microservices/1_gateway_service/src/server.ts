import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
import { Logger } from "winston";
import http from 'http';
import { StatusCodes } from 'http-status-codes';
import { isAxiosError } from 'axios';
import compression from 'compression';
import { appRoutes } from './routes';
import cookieSession from 'cookie-session';
import { config } from '@gateway/config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';


const SERVER_PORT = 4000;
const DEFAULT_ERROR_CODE = 500;


export class GatewayServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.errorHandler(this.app);
    this.startServer(this.app);

  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development',
        ...(config.NODE_ENV !== 'development' && {
          sameSite: 'none'
        })
      })
    );
    app.use(hpp());
    app.use(helmet());

    app.use(cors({
      origin: config.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));


  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }))
  }

  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }



  private errorHandler(app: Application): void {
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      //log.log('error', `${fullUrl} endpoint does not exist.`, '');
      res.status(StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist.' });
      next();
    });

    // app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    //   if (error instanceof CustomError) {
    //     log.log('error', `GatewayService ${error.comingFrom}:`, error);
    //     res.status(error.statusCode).json(error.serializeErrors());
    //   }

    //   if (isAxiosError(error)) {
    //     log.log('error', `GatewayService Axios Error - ${error?.response?.data?.comingFrom}:`, error);
    //     res.status(error?.response?.data?.statusCode ?? DEFAULT_ERROR_CODE).json({ message: error?.response?.data?.message ?? 'Error occurred.' });
    //   }

    //   next();
    // });
  }


  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log('error');

      //log.log('error', 'GatewayService startServer() error method:', error)
    }
  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {

      console.log(`Gateway server has started with process id ${process.pid}`);
      httpServer.listen(SERVER_PORT, () => {
        console.log(`Gateway server running on port ${SERVER_PORT}`);
      });

    } catch (error) {
      //log.log('error', 'GatewayService startserver() error method:', error)
      console.log('error');
    }


  }


}




