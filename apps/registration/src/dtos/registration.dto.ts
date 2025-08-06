import { ApiProperty } from '@nestjs/swagger';

export class RegistrationInputDto {
  @ApiProperty({
    type: String,
    example: '093453239',
  })
  studentId: string;

  @ApiProperty({
    type: String,
    example: 'Juan dela Cruz',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'BCS',
  })
  courseCode: string;
}
