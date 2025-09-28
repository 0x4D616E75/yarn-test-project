import { NestFactory } from '@nestjs/core';
import { Logger } from '@test-project/shared-lib';
import { AppModule } from './app.module';

const logger = new Logger('API');

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for development
    app.enableCors();

    // Global prefix for all routes
    app.setGlobalPrefix('api');

    const port = process.env.PORT || 3000;

    await app.listen(port);

    logger.info(`🚀 Application is running on: http://localhost:${port}/api`);
  } catch (error) {
    logger.error('Failed to start the application', error);
    process.exit(1);
  }
}

bootstrap();
