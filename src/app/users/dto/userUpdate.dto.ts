// Core
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// Dto
import { UserCreateDto } from './userCreate.dto';

// Constants
import { UserRoleEnum } from '../constants/user.constant';

export class UserUpdateDto extends PartialType(UserCreateDto) {
  @ApiProperty({ example: 'customer' })
  @IsNotEmpty()
  @IsEnum(UserRoleEnum, { message: 'Role must be a valid enum value' })
  role: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  password?: string;
}
