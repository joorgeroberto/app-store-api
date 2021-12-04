import 'dotenv/config';
import { Server } from './server';

const server = new Server();

server.init();
server.start();
