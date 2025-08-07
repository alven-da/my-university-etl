import { Student } from '@registration/entities/student.entity';

import { RegistrationRepository } from '@registration/repositories/registration.repository';

export class RegistrationMockRepository extends RegistrationRepository {
  async getStudentById(studentId: string): Promise<Student> {
    return {
      id: studentId,
      name: 'Juan dela Cruz',
      course: 'BCS',
      dob: '1990-10-01',
      yearEnrolled: 2007,
    } as Student;
  }
}
