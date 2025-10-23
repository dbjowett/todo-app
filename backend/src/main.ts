import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/middleware';

const corsConfig: CorsOptions = {
  origin: ['http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
} as const;

async function bootstrap() {
  const port = parseInt(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use((req: any, res: any, next: any) =>
    new LoggerMiddleware().use(req, res, next),
  );
  app.enableCors(corsConfig);
  await app.listen(port);
  console.log(`🚀 Nest.js: Listening on port: ${port}`);
}

bootstrap();
