// Core
import {
  ExecutionContext,
  createParamDecorator,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthType } from '../types/auth.type';

// Get the auth user in the application
export const User = createParamDecorator(
  // Get the context applictaion in the function
  (_: unknown, context: ExecutionContext) => {
    // Get the request
    const request = context.switchToHttp().getRequest();

    // Valid if the user exist
    if (!request.user) throw new UnauthorizedException();

    const user = request.user as AuthType;

    // Return the user object
    return user;
  },
);
