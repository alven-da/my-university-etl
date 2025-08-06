import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { RegistrationInputDto } from '@registration/dtos/registration.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly mqClient: ClientProxy,
  ) {}

  async sendMessage(data: RegistrationInputDto): Promise<any> {
    const pattern = 'student.register';
    try {
      return this.mqClient.emit(pattern, data).toPromise();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
