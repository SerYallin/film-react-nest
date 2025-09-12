import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { FilmsRepository } from './repository/films.repository';
import { databaseProvider } from './app.database.provider';

console.log({
  dir: __dirname,
  path: path.join(__dirname, '..', 'public/content/afisha/'),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'public/content/afisha/'),
      serveRoot: '/content/afisha',
      serveStaticOptions: {
        fallthrough: true,
      },
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    databaseProvider,
    FilmsService,
    OrderService,
    FilmsRepository,
  ],
  exports: [databaseProvider],
})
export class AppModule {}
