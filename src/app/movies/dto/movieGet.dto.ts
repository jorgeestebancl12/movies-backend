// Core
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

// Constants
import { FilterMovieConstants } from '../constants/filter.constants';

export class MovieGetDto {
  @ApiProperty({
    default: 1,
    type: Number,
    nullable: true,
    required: false,
    description: 'Current page',
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  page: number;

  @ApiProperty({
    nullable: true,
    required: false,
    description: 'Any word',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ example: 'now_playing' })
  @IsEnum(FilterMovieConstants, {
    message: 'Filter section must be a valid enum value',
  })
  section: string;
}
