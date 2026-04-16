import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  // Use environment variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;
  const clientUrl = configService.get<string>('CLIENT_URL') || '*';

  // Enable CORS properly
  app.enableCors({
    origin: clientUrl,
    credentials: true,
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  // Global validation (VERY IMPORTANT)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true, // throw error on unknown fields
      transform: true, // auto-transform DTO types
    }),
  );

  // Graceful shutdown (important for Docker/DevOps)
  app.enableShutdownHooks();

  await app.listen(port);

  logger.log(`Server running on http://localhost:${port}/api`);
}

bootstrap();