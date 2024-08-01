// Core
import { SetMetadata } from '@nestjs/common';

// Constants
import { UserRoleEnum } from '../../users/constants/user.constant';

// Const key user roles
export const USER_ROLES_KEY = 'user-roles';

/**
 * UserRole
 * @description Define a role with permission
 * @param {UserRoleEnum[]} roles
 * @returns
 */
export const UserRole = (...roles: UserRoleEnum[]) =>
  SetMetadata(USER_ROLES_KEY, roles);
