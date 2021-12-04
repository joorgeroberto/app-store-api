import { IS_PRODUCTION } from './server';

const dir = IS_PRODUCTION ? 'dist' : 'src';

export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) || 5432;
export const DATABASE_NAME = process.env.DATABASE_NAME || 'postgres';
export const DATABASE_USER = process.env.DATABASE_USER || 'postgres';
export const DATABASE_PASS = process.env.DATABASE_PASS || 'postgres';

export const ENTITIES = `${dir}/modules/database/entities/*.{ts,js}`;
export const MIGRATIONS = `${dir}/modules/database/migrations/*.{ts,js}`;
export const MIGRATIONS_DIR = `${dir}/modules/database/migrations`;
