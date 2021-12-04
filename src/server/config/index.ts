import { Server as SetupServer } from '@overnightjs/core';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

import swagger from 'swagger-ui-express';
import swaggerDocs from '@src/docs/swagger.json';

import * as settings from '../settings';

export class Server extends SetupServer {
  constructor() {
    super();
  }

  public init(): void {
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

  public start(): void {
    this.app.listen(settings.PORT, () => {
      console.log('server online!');
    });
  }
}
