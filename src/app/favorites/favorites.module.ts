// Core
import { Module } from '@nestjs/common';

// Services
import { FavoritesService } from './favorites.service';

// Controllers
import { FavoritesController } from './favorites.controller';

// Repositories
import { FavoriteRepository } from './repositories/favorite.repository';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoriteRepository],
})
export class FavoritesModule {}
