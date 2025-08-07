import { Test, TestingModule } from '@nestjs/testing';

import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';

import { CurriculumRepository } from './repositories/curriculum.repository';

import { Subject } from './entities/curriculum.entity';

describe('CurriculumService', () => {
  let curriculumService: CurriculumService;

  const subjects: Subject[] = [
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
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurriculumController],
      providers: [
        CurriculumService,
        {
          provide: 'RABBITMQ_CLIENT',
          useValue: {},
        },
        {
          provide: CurriculumRepository,
          useValue: {
            getSubjectsByCourseCode: jest.fn().mockReturnValue(subjects),
            saveStudentCurriculum: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    curriculumService = app.get<CurriculumService>(CurriculumService);
  });

  describe('root', () => {
    it('should process the data without exceptions thrown', async () => {
      const saved = await curriculumService.processSubjects({
        studentId: '093453239',
        name: 'Juan dela Cruz',
        courseCode: 'BCS',
      });

      expect(saved).toBe(true);
    });
  });
});
