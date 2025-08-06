import { Module } from '@nestjs/common';

import { createRabbitMQClient } from '@registration/common/util';

@Module({
  providers: [
    {
      provide: 'RABBITMQ_CLIENT',
      useValue: createRabbitMQClient(),
    },
  ],
  exports: ['RABBITMQ_CLIENT'],
})
export class RabbitMQClientModule {}
