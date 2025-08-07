import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { RegistrationInputDto } from '@registration/dtos/registration.dto';
import { RegistrationRepository } from '@registration/repositories/registration.repository';
import { Student } from '@registration/entities/student.entity';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly mqClient: ClientProxy,
    private readonly regRepo: RegistrationRepository,
  ) {}

  private serializeData(entity: Student): Record<string, string | number> {
    return {
      studentId: entity.id,
      name: entity.name,
      dob: entity.dob,
      yearEnrolled: entity.yearEnrolled,
      courseCode: entity.course,
    };
  }

  async sendMessage(studentId: string): Promise<any> {
    const pattern = 'student.register';
    try {
      // Fetch student record based on ID passed in the API
      const studentRecord = await this.regRepo.getStudentById(studentId);

      return this.mqClient
        .emit(pattern, this.serializeData(studentRecord))
        .toPromise();

      // return new Promise((resolve, reject) => {
      //   this.mqClient
      //     .send(pattern, this.serializeData(studentRecord))
      //     .subscribe((response) => {
      //       resolve(response);
      //     });
      // });
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
