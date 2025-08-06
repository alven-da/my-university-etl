import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RegistrationController } from '@registration/registration.controller';
import { RegistrationService } from '@registration/registration.service';
import { RabbitMQClientModule } from '@registration/common/rabbit-mq-producer.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RabbitMQClientModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
