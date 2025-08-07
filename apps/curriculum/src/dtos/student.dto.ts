import { ApiProperty } from '@nestjs/swagger';

export class CurriculumDto {
  @ApiProperty({
    type: String,
    example: '093453239',
  })
  studentId: string;

  @ApiProperty({
    example: 'Juan dela Cruz',
  })
  name: string;

  @ApiProperty({
    example: 'BCS',
  })
  courseCode: string;
}
