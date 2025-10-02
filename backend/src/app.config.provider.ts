import 'dotenv/config';
import { Provider } from '@nestjs/common';

export const configProvider: Provider = {
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DB_DRIVER,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
      db: process.env.DB_NAME,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  host: string;
  port: number;
  user: string;
  pass: string;
  db: string;
}
