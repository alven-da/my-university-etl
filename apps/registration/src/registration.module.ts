import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RegistrationController } from '@registration/registration.controller';

import { RegistrationService } from '@registration/registration.service';

import { RabbitMQClientModule } from '@registration/common/rabbit-mq-producer.module';
import { RegistrationRepository } from '@registration/repositories/registration.repository';

import { RegistrationMockRepository } from '@registration/repositories/registration.mock.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RabbitMQClientModule],
  controllers: [RegistrationController],
  providers: [
    {
      provide: RegistrationRepository,
      useClass: RegistrationMockRepository,
    },
    RegistrationService,
  ],
})
export class RegistrationModule {}
