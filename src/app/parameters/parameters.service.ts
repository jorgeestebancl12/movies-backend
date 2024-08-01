// Core
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ParametersService {
  constructor(private readonly httpService: HttpService) {}

  async genders() {
    const { data } = await firstValueFrom(
      this.httpService.get('genre/movie/list').pipe(
        catchError((error: AxiosError) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );

    return data;
  }
}
