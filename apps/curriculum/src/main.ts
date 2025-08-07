import { NestFactory } from '@nestjs/core';
import { CurriculumModule } from '@curriculum/curriculum.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(CurriculumModule);

  const config = new DocumentBuilder()
    .setTitle('Curriculum Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.CURRICULUM_PORT ?? 3501);
}

bootstrap();
