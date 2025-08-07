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

  describe('root', () => {
    it('should return "This is Curriculum Service"', () => {
      expect(controller.healthCheck()).toBe('This is Curriculum Service');
    });

    it('should receive the message from MQ and process using service', async () => {});
  });
});
