// Core
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class ReatingGetDto {
  @ApiProperty({
    default: 20,
    type: Number,
    nullable: false,
    required: true,
    description: 'Max items by page',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  limit: number;

  @ApiProperty({
    default: 1,
    type: Number,
    nullable: false,
    required: true,
    description: 'Current page',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  page: number;
}
