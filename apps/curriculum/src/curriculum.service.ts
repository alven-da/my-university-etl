import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

import { CurriculumDto } from '@curriculum/dtos/student.dto';
import { CurriculumRepository } from '@curriculum/repositories/curriculum.repository';
import { Curriculum } from '@curriculum/entities/curriculum.entity';

@Injectable()
export class CurriculumService {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly mqClient: ClientProxy,
    private readonly curriculumRepo: CurriculumRepository,
  ) {}

  @EventPattern('student.register')
  async processSubjects(input: CurriculumDto): Promise<boolean> {
    try {
      const { courseCode, studentId, name } = input;
      const subjects =
        await this.curriculumRepo.getSubjectsByCourseCode(courseCode);

      // Transform - create a simple curriculum object based on query
      const curriculum: Curriculum = {
        courseCode,
        studentId,
        studentName: name,
        subjectId: subjects.map(({ id }) => id),
      };

      // Load - a curriculum based on course will be saved
      const saved = await this.curriculumRepo.saveStudentCurriculum(curriculum);

      if (!saved) {
        throw new Error(
          `Curriculum for student ${studentId} was not saved. Please try again later`,
        );
      }

      return saved;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
