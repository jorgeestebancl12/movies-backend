// Core
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Get, Post, Body, Query, Controller, HttpStatus } from '@nestjs/common';

// Services
import { ReatingsService } from './reatings.service';

// Dto
import { ReatingCreateDto } from './dto/reatingCreate.dto';
import { ReatingGetDto } from './dto/reatingGet.dto';

// Constants
import { UserRoleEnum } from '../users/constants/user.constant';

// Security
import { Auth, User } from '../auth/decorators';
import { AuthType } from '../auth/types/auth.type';

@Auth()
@ApiBearerAuth()
@ApiTags('Reatings')
@Controller('reatings')
export class ReatingsController {
  constructor(private readonly reatingsService: ReatingsService) {}

  @Post()
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  create(@Body() reatingCreateDto: ReatingCreateDto, @User() user: AuthType) {
    return this.reatingsService.create(reatingCreateDto, user);
  }

  @Get()
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findAll(@Query() query: ReatingGetDto, @User() user: AuthType) {
    return this.reatingsService.findAll(query, user);
  }
}
