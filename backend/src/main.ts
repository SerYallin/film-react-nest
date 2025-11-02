import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const logger = process.env.LOGGER ?? 'dev';
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  switch (logger) {
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    default:
      app.useLogger(new DevLogger());
  }
  await app.listen(3000);
}
bootstrap();
