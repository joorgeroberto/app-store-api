import { Server as SetupServer } from '@overnightjs/core';
import cors from 'cors';
import helmet from 'helmet';
import express, { Application } from 'express';
import { Connection, createConnection, getConnection } from 'typeorm';

import swagger from 'swagger-ui-express';
import swaggerDocs from '@src/docs/swagger.json';

import * as Settings from '../settings';

export class Server extends SetupServer {
  constructor() {
    super();
  }

  public async init(): Promise<void> {
    await this.startConnection();

    this.setupExpress();
    this.setupControllers();
  }

  private setupControllers(): void {
    this.addControllers([]);
  }

  private setupExpress(): void {
    this.app.use(cors());
    this.app.use(helmet());

    this.app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs));

    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true
      })
    );
  }

  public getApp(): Application {
    return this.app;
  }

  public startConnection(): Promise<Connection> {
    return createConnection();
  }

  public dropConnection(): Promise<void> {
    return getConnection().close();
  }

  public start(): void {
    this.app.listen(Settings.PORT, () => {
      console.log('server online!');
    });
  }
}
