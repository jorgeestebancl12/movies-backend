// Core
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

// Dto
import { MovieGetDto } from './dto/movieGet.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(query: MovieGetDto) {
    const options = {
      now_playing: 'movie/now_playing',
      top_rated: 'movie/top_rated',
      upcoming: 'movie/upcoming',
      popular: 'movie/popular',
      filter: 'search/movie',
    };

    const service = options[query.section];

    const { data } = await firstValueFrom(
      this.httpService
        .get(service, {
          params: { page: query.page, query: query.search },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );

    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`movie/${id}`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );

    return data;
  }

  async findRecommendations(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`movie/${id}/recommendations`).pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );

    return data;
  }
}
