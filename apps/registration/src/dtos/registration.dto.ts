import { ApiProperty } from '@nestjs/swagger';

export class RegistrationInputDto {
  @ApiProperty({
    type: String,
    example: '093453239',
  })
  studentId: string;
}
