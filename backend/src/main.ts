import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';
import envs from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Contratos ENETEC')
    .setDescription('Documentación de la API para la gestión de contratos')
    .setVersion('1.0.0')
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  app.use('/docs', apiReference({ content: document, theme: 'deepSpace' }));
  await app.listen(envs.PORT);
}
bootstrap();
