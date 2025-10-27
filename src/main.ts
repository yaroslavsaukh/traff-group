import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('PoW MVP API')
    .setDescription('Header-check + Proof-of-Work + Rate limiting')
    .setVersion('1.0')
    .addTag('pow')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(4000);
  console.log('Application listening on http://localhost:4000');
  console.log('Swagger: http://localhost:4000/docs');
}
bootstrap();
