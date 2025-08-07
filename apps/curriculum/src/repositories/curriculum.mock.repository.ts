import { Subject, Curriculum } from '@curriculum/entities/curriculum.entity';
import { CurriculumRepository } from '@curriculum/repositories/curriculum.repository';

export class CurriculumMockRepository extends CurriculumRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSubjectsByCourseCode(courseCode: string): Promise<Subject[]> {
    return [
      {
        id: 'Hum101',
        name: 'Art Appreciation',
        units: 3,
      },
      {
        id: 'Com101',
        name: 'History of Computer',
        units: 3,
      },
      {
        id: 'Com102',
        name: 'Programming Language 1',
        units: 3,
      },
      {
        id: 'Eng101',
        name: 'English Language 1',
        units: 3,
      },
      {
        id: 'Soc101',
        name: 'Social Studies 1',
        units: 3,
      },
    ] as Subject[];
  }

  async saveStudentCurriculum(curriculum: Curriculum): Promise<boolean> {
    return true;
  }
}
