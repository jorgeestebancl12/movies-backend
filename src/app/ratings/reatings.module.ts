// Core
import { Module } from '@nestjs/common';

// Services
import { ReatingsService } from './reatings.service';

// Controllers
import { ReatingsController } from './reatings.controller';

// Repositories
import { ReatingRepository } from './repositories/reating.repository';

@Module({
  controllers: [ReatingsController],
  providers: [ReatingsService, ReatingRepository],
})
export class ReatingsModule {}
