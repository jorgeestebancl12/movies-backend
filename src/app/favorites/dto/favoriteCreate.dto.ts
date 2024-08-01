import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class FavoriteCreateDto {
  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  movie_code: number;
}
