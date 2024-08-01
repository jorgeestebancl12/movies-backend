// Core
import { ApiProperty } from '@nestjs/swagger';

// Validation
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthLoginDto {
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