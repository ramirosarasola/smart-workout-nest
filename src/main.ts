import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades enviadas que no necesitamos.
      forbidNonWhitelisted: true, // Retorna 400 si se envia una property que no es esperada.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
