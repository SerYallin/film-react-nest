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
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films/entity/films.entity';
import { Schedules } from './schedule/entity/schedules.entity';
import { Tickets } from './ticket/entity/tickets.entity';
import { Orders } from './order/entity/orders.entity';
import { OrdersRepository } from './repository/orders.repository';

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
    DatabaseModule,
    TypeOrmModule.forFeature([Films, Schedules, Tickets, Orders]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsService, OrderService, FilmsRepository, OrdersRepository],
  exports: [],
})
export class AppModule {}
