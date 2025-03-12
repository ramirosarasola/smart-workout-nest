import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades enviadas que no necesitamos.
      forbidNonWhitelisted: true, // Retorna 400 si se envia una property que no es esperada.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
