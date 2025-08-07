import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export const createRabbitMQClient = (): ClientProxy | null => {
  try {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rmq_user:rmq_password@localhost:5672'],
        queue: 'main_queue',
        queueOptions: { durable: false },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
