import { NestFactory } from '@nestjs/core';
import { RegistrationModule } from './registration.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(RegistrationModule);

  const config = new DocumentBuilder()
    .setTitle('Registration Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.REGISTRATION_PORT ?? 3500);
}

bootstrap();
