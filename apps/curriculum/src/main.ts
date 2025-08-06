import { NestFactory } from '@nestjs/core';
import { CurriculumModule } from './curriculum.module';

async function bootstrap() {
  const app = await NestFactory.create(CurriculumModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
