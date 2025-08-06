import { Controller, Get } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';

@Controller()
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get()
  getHello(): string {
    return this.curriculumService.getHello();
  }
}
