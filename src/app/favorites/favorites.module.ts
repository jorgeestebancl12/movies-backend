// Core
import { Module } from '@nestjs/common';

// Services
import { FavoritesService } from './favorites.service';

// Controllers
import { FavoritesController } from './favorites.controller';

// Repositories
import { FavoriteRepository } from './repositories/favorite.repository';

// Modules
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [MoviesModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoriteRepository],
})
export class FavoritesModule {}
