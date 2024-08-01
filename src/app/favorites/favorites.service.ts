// Core
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

// Dto
import { FavoriteCreateDto } from './dto/favoriteCreate.dto';
import { FavoriteGetDto } from './dto/favoriteGet.dto';

// Security
import { AuthType } from '../auth/types/auth.type';

// Repositories
import { FavoriteRepository } from './repositories/favorite.repository';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favorityRepository: FavoriteRepository,
    private readonly moviesService: MoviesService,
  ) {}

  async create(favoriteCreateDto: FavoriteCreateDto, auth: AuthType) {
    // Create the record
    const favorite = await this.favorityRepository
      .save({
        movie_code: favoriteCreateDto.movie_code,
        user_id: auth.user.id,
      })
      .catch((error) => {
        if (error.code === '23505') {
          throw new ConflictException(error);
        } else throw new InternalServerErrorException(error);
      });

    return favorite;
  }

  async findAll(query: FavoriteGetDto, auth: AuthType) {
    // Search the result
    const result = await this.favorityRepository
      .find({
        where: {
          user_id: auth.user.id,
        },
        take: query.limit,
        skip: query.limit * (query.page - 1),
        order: { created_at: 'DESC' },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // Return result
    return await Promise.all(
      result.map(async (i) => await this.moviesService.findOne(i.movie_code)),
    );
  }

  async remove(id: number, auth: AuthType) {
    // Validate the movie
    const favorite = await this.favorityRepository
      .findOne({
        where: {
          movie_code: id,
          user_id: auth.user.id,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // Validate if the movie exists
    if (!favorite) {
      throw new NotFoundException();
    }

    // Remove the record
    await this.favorityRepository.remove(favorite).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    return favorite;
  }
}
