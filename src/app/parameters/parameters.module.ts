// Core
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Services
import { ParametersService } from './parameters.service';

// Controllers
import { ParametersController } from './parameters.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('THEPARAMETER_URL'),
        timeout: configService.get('THEPARAMETER_TIMEOUT'),
        headers: {
          Authorization: `bearer ${configService.get('THEPARAMETER_TOKEN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ParametersController],
  providers: [ParametersService],
})
export class ParametersModule {}
