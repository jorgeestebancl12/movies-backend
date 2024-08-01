// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Modules
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ReatingsModule } from './ratings/reatings.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ParametersModule } from './parameters/parameters.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        migrations: [__dirname + '/db/migration/*{.ts,.js}'],
        migrationsRun: false, // Remove in production,
        synchronize: false, // Remove in production,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MoviesModule,
    ReatingsModule,
    FavoritesModule,
    ParametersModule,
  ],
})
export class AppModule {}
