// Core
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Services
import { MoviesService } from './movies.service';

// Controllers
import { MoviesController } from './movies.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('THEMOVIE_URL'),
        timeout: configService.get('THEMOVIE_TIMEOUT'),
        headers: {
          Authorization: `bearer ${configService.get('THEMOVIE_TOKEN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
