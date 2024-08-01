// Core
import { Get, Put, Body, Delete, Controller, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Services
import { UsersService } from './users.service';

// Dto
import { UserUpdateDto } from './dto/userUpdate.dto';

// Security
import { Auth, User } from '../auth/decorators';
import { AuthType } from '../auth/types/auth.type';

// Constants
import { UserRoleEnum } from './constants/user.constant';

@Auth()
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  find(@User() auth: AuthType) {
    return this.usersService.findOne(auth);
  }

  @Put()
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  update(@Body() userUpdateDto: UserUpdateDto, @User() auth: AuthType) {
    return this.usersService.update(userUpdateDto, auth);
  }

  @Delete()
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  remove(@User() auth: AuthType) {
    return this.usersService.remove(auth);
  }
}
