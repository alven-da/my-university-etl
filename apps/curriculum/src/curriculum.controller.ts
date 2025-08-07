import { Controller, Get } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';

@Controller()
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get()
  healthCheck(): string {
    return 'This is Curriculum Service';
  }
}
