import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { CurriculumService } from '@curriculum/curriculum.service';
import { CurriculumDto } from '@curriculum/dtos/student.dto';

@Controller()
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get()
  healthCheck(): string {
    return 'This is Curriculum Service';
  }

  @EventPattern('student.register')
  // async processMessage(@Payload() data: any, @Ctx() context: RmqContext) {
  async processMessage(data: any) {
    return this.curriculumService.processSubjects({
      courseCode: data.courseCode,
      name: data.name,
      studentId: data.studentId,
    } as CurriculumDto);
  }
}
