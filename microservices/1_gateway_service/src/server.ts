import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
import { Logger } from "winston";
import http from 'http';
import { StatusCodes } from 'http-status-codes';
import { isAxiosError } from 'axios';






const SERVER_PORT = 4000;
const DEFAULT_ERROR_CODE = 500;



export class GatewayServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {

    this.errorHandler(this.app);
    this.startServer(this.app);

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




