import { Injectable } from '@nestjs/common';
import { Logger } from '@test-project/shared-lib';

@Injectable()
export class AppService {
  private readonly logger = new Logger('AppService');

  getHello(): string {
    this.logger.info('Hello endpoint called');
    return 'Hello World from NestJS API!';
  }
}
