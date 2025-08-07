import { Module } from '@nestjs/common';

import { createRabbitMQClient } from '@curriculum/common/util';

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
