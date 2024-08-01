// Core
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ example: 'Juan Perez' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  fullname: string;

  @ApiProperty({ example: 'juan.perez@inlaze.com' })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(130)
  email: string;

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  password: string;
}
