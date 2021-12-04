import { Server as SetupServer } from '@overnightjs/core';
import * as settings from '../settings';

export class Server extends SetupServer {
  constructor() {
    super();
  }
  public start(): void {
    this.app.listen(settings.PORT, () => {
      console.log('server online!');
    });
  }
}
