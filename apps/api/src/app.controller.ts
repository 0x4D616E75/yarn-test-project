import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createApiResponse, type ApiResponse } from '@test-project/shared-lib';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse<string> {
    const message = this.appService.getHello();
    return createApiResponse(true, message);
  }

  @Get('health')
  getHealth(): ApiResponse<{ status: string; timestamp: Date }> {
    const healthData = {
      status: 'OK',
      timestamp: new Date(),
    };
    return createApiResponse(true, healthData);
  }
}
