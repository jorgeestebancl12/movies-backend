// Core
import { Injectable, InternalServerErrorException } from '@nestjs/common';

// Dto
import { ReatingCreateDto } from './dto/reatingCreate.dto';
import { ReatingGetDto } from './dto/reatingGet.dto';

// Repository
import { ReatingRepository } from './repositories/reating.repository';

// Security
import { AuthType } from '../auth/types/auth.type';

@Injectable()
export class ReatingsService {
  constructor(private readonly reatingRepository: ReatingRepository) {}

  async create(reatingCreateDto: ReatingCreateDto, auth: AuthType) {
    // Validate the record
    const validate = await this.reatingRepository
      .findOne({
        where: {
          movie_code: reatingCreateDto.movie_code,
          user_id: auth.user.id,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // Validate if the record exists
    if (!validate) {
      // If the record not exist
      return await this.reatingRepository
        .save({
          movie_code: reatingCreateDto.movie_code,
          reating: reatingCreateDto.reating,
          user_id: auth.user.id,
        })
        .catch((error) => {
          throw new InternalServerErrorException(error);
        });
    }

    // If the record exist
    return await this.reatingRepository
      .save({
        ...validate,
        reating: reatingCreateDto.reating,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async findAll(query: ReatingGetDto, auth: AuthType) {
    // Search the result
    const result = await this.reatingRepository
      .find({
        where: {
          user_id: auth.user.id,
        },
        take: query.limit,
        skip: query.limit * (query.page - 1),
        order: { reating: 'DESC' },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // Return result
    return result;
  }
}
