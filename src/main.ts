import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades enviadas que no necesitamos.
      forbidNonWhitelisted: true, // Retorna 400 si se envia una property que no es esperada.
    }),
  );

  // Registra el plugin de multipart
  await app.register(multipart, {
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB
    },
  });

  await app.register(fastifyStatic, {
    root: join(__dirname, '..', 'static'), // Directorio donde están las imágenes
    prefix: '/files', // Prefijo para acceder a los archivos
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Smart Workouts')
    .setDescription('The smart-workout API description')
    .setVersion('1.0')
    .addTag('smart-workouts')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  logger.log(`Application is running on PORT: ${process.env.PORT || 3000} 🚀`);
}
void bootstrap();
