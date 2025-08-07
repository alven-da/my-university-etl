import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RegistrationService } from '@registration/registration.service';
import { RegistrationInputDto } from '@registration/dtos/registration.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Registration')
@Controller()
export class RegistrationController {
  constructor(private readonly appService: RegistrationService) {}

  @ApiOperation({ summary: 'Health Check' })
  @Get()
  healthCheck(): string {
    return 'This is the Registration Service';
  }

  @ApiOperation({ summary: 'Send data to consumer' })
  @Post('/messages/send/:studentId')
  async sendMessage(@Param('studentId') studentId: string): Promise<string> {
    return this.appService.sendMessage(studentId);
  }
}
