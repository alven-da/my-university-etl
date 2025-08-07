import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RabbitMQClientModule } from '@curriculum/common/rabbit-mq-consumer.module';
import { CurriculumController } from '@curriculum/curriculum.controller';
import { CurriculumService } from '@curriculum/curriculum.service';
import { CurriculumRepository } from '@curriculum/repositories/curriculum.repository';
import { CurriculumMockRepository } from '@curriculum/repositories/curriculum.mock.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RabbitMQClientModule],
  controllers: [CurriculumController],
  providers: [
    CurriculumService,
    {
      provide: CurriculumRepository,
      useClass: CurriculumMockRepository,
    },
  ],
})
export class CurriculumModule {}
