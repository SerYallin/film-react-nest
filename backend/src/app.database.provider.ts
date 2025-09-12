import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { AppConfig } from './app.config.provider';

export const databaseProvider: Provider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (config: AppConfig) => {
    const { driver, url } = config.database;

    if (driver === 'mongodb') {
      await mongoose.connect(url);
      return mongoose.connection;
    }

    throw new Error(`Unsupported database driver: ${driver}`);
  },
  inject: ['CONFIG'],
};
