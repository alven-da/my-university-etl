import { Injectable } from '@nestjs/common';

@Injectable()
export class CurriculumService {
  getHello(): string {
    return 'Hello World!';
  }
}
