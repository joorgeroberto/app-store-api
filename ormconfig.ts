import { ConnectionOptions } from 'typeorm';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const dir = IS_PRODUCTION ? 'dist' : 'src';

const path = `./${dir}/server/settings`;

const Settings = require(path);

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: Settings.DATABASE_HOST,
  port: Settings.DATABASE_PORT,
  database: Settings.DATABASE_NAME,
  username: Settings.DATABASE_USER,
  password: Settings.DATABASE_PASS,
  cache: true,
  entities: [Settings.ENTITIES],
  migrations: [Settings.MIGRATIONS],
  cli: {
    migrationsDir: Settings.MIGRATIONS_DIR
  }
};

export default connectionOptions;
