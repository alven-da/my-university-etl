import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CurriculumModule } from '@curriculum/curriculum.module';

async function bootstrap() {
  const app = await NestFactory.create(CurriculumModule);

  const config = new DocumentBuilder()
    .setTitle('Curriculum Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const microservice = await NestFactory.createMicroservice(CurriculumModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rmq_user:rmq_password@localhost:5672'],
      queue: 'main_queue',
      queueOptions: { durable: false },
    },
  });

  await microservice.listen();

  await app.listen(process.env.CURRICULUM_PORT ?? 3501);
}

bootstrap();
