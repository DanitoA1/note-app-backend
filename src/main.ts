import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';

const logger = new Logger('bootstrap');

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Note App API')
    .setDescription('The Note App API documentation')
    .setVersion('1.0')
    .addTag('notes')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  fs.writeFileSync('swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
