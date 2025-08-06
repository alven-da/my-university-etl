import { Body, Controller, Get, Post } from '@nestjs/common';

import { RegistrationService } from '@registration/registration.service';
import { RegistrationInputDto } from '@registration/dtos/registration.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiBody({ type: RegistrationInputDto })
  @Post('/messages/send')
  async sendMessage(@Body() body: RegistrationInputDto): Promise<string> {
    return this.appService.sendMessage(body);
  }
}
