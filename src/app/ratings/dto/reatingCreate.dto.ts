import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';

export class ReatingCreateDto {
  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  movie_code: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(10)
  reating: number;
}
