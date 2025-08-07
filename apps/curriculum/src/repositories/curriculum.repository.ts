import { Injectable } from '@nestjs/common';

import { Curriculum, Subject } from '@curriculum/entities/curriculum.entity';

@Injectable()
export abstract class CurriculumRepository {
  abstract getSubjectsByCourseCode(courseCode: string): Promise<Subject[]>;
  abstract saveStudentCurriculum(curriculum: Curriculum): Promise<boolean>;
}
