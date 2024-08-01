// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { UsersService } from './users.service';

// Repositories
import { UserRepository } from './repositories/user.repository';

// Entities
import { User } from './entities/user.entity';

// Controllers
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
