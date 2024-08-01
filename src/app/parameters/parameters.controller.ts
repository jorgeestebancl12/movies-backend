// Core
import { Get, Controller, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Services
import { ParametersService } from './parameters.service';

// Security
import { Auth } from '../auth/decorators';
import { UserRoleEnum } from '../users/constants/user.constant';

@Auth()
@ApiBearerAuth()
@ApiTags('Parameters')
@Controller('parameters')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @Get('genders')
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  genders() {
    return this.parametersService.genders();
  }
}
