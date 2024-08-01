// Core
import { LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Utilities
import Documentation from './utilities/documentation.utility';

// Modules
import { AppModule } from './app/app.module';

// Config
import { config } from 'dotenv';
config();

// Create a NestJS application instance
async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const logLevels: LogLevel[] = isProduction
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'verbose', 'debug'];

  // Prefix application and documentation
  const globalPrefix = 'api';
  const docPrefix = 'docs';

  // Port start application
  const port = process.env.PORT || 3000;

  // Create the application
  const application = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  // Active cors
  application.enableCors();

  // Add application prefix
  application.setGlobalPrefix(globalPrefix);

  // Swagger Documentation
  new Documentation(application, docPrefix);

  // Constructor of the validation messages
  application.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Star the application
  await application.listen(port);

  // This a logs with the urls
  Logger.log(`🚀 Application ⇢ http://localhost:${port}/${globalPrefix}`);
  Logger.log(`📖 Swagger ⇢ http://localhost:${port}/${docPrefix}`);
}

// Call the bootstrap function
bootstrap();
