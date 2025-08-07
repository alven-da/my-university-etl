import { Test, TestingModule } from '@nestjs/testing';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { CurriculumRepository } from './repositories/curriculum.repository';

describe('CurriculumController', () => {
  let controller: CurriculumController;
  let service: CurriculumService;

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
          useValue: {},
        },
      ],
    }).compile();

    controller = app.get<CurriculumController>(CurriculumController);
    service = app.get<CurriculumService>(CurriculumService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('root', () => {
    it('should return "This is Curriculum Service"', () => {
      expect(controller.healthCheck()).toBe('This is Curriculum Service');
    });

    it('should receive the message from MQ and process using service', async () => {
      jest.spyOn(service, 'processSubjects').mockResolvedValue(true);

      const data = {
        pattern: 'student.register',
        data: {
          studentId: '093453239',
          name: 'Juan dela Cruz',
          courseCode: 'BCS',
        },
      };

      const result = await controller.processMessage(data);

      expect(result).toBe(true);
    });
  });
});
