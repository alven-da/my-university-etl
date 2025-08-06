import { Test, TestingModule } from '@nestjs/testing';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';

describe('CurriculumController', () => {
  let curriculumController: CurriculumController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurriculumController],
      providers: [CurriculumService],
    }).compile();

    curriculumController = app.get<CurriculumController>(CurriculumController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(curriculumController.getHello()).toBe('Hello World!');
    });
  });
});
