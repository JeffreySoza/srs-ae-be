import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Set the cors property to true to enable CORS with default settings. We do this to accept request from other apps
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
