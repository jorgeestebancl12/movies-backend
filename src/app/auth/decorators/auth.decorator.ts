// Core
import { applyDecorators, UseGuards } from '@nestjs/common';

// Guards
import { JwtAuthGuard, UserRoleGuard } from '../guards';

// Decorators
import { UserRole } from './user-role.decorator';

// Constants
import { UserRoleEnum } from '../../users/constants/user.constant';

/**
 * Auth
 * @description Validate the authentication with role optional
 * @param {UserRoleEnum[]} roles
 * @returns
 */
export function Auth(...roles: UserRoleEnum[]) {
  // Return decorators
  return applyDecorators(
    UserRole(...roles),
    UseGuards(JwtAuthGuard, UserRoleGuard),
  );
}
