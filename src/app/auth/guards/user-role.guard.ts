// Core
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Key decorator
import { USER_ROLES_KEY } from '../decorators';

// Constants
import { UserRoleEnum } from '../../users/constants/user.constant';

// Entities
import { User } from '../../users/entities/user.entity';

@Injectable()
// Create user role guard
export class UserRoleGuard implements CanActivate {
  // Refactor get metadata
  constructor(private reflector: Reflector) {}

  // Validate guard
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      USER_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If not roles return true default success
    if (!roles || roles.length === 0) return true;

    // Get user in header
    const request = context.switchToHttp().getRequest();

    // Create const with the user
    const user: User = request.user;

    // If not exist user return Unauthorized
    if (!user) throw new UnauthorizedException();

    // Valid that role exist in user
    if (roles.find((item) => item == user.role)) return true;
    else throw new ForbiddenException(`User need valid type [${roles}]`);
  }
}
