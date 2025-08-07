import { Injectable } from '@nestjs/common';

import { Student } from '@registration/entities/student.entity';

@Injectable()
export abstract class RegistrationRepository {
  abstract getStudentById(studentId: string): Promise<Student>;
}
