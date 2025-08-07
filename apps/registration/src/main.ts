import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

import { RegistrationModule } from '@registration/registration.module';

async function bootstrap() {
  const app = await NestFactory.create(RegistrationModule);

  const config = new DocumentBuilder()
    .setTitle('Registration Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const microservice = await NestFactory.createMicroservice(
    RegistrationModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rmq_user:rmq_password@localhost:5672'],
        queue: 'main_queue',
        queueOptions: { durable: false },
      },
    },
  );

  await microservice.listen();
  await app.listen(process.env.REGISTRATION_PORT ?? 3500);
}

bootstrap();
