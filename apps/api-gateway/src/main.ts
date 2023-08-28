/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Puppilots")
    .setDescription("API REST Gateway for Puppilots.com")
    .setVersion("1.0.0.1b")
    .addTag('Endpoints')
    .addServer(process.env.SWAGGER_URL)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://puppilots.com/${globalPrefix}`
  );
}

bootstrap();
