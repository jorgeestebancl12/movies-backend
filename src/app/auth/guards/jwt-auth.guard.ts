// Core
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Create gauard valid jwt
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * canActivate
   * @param  {ExecutionContext} context
   */
  canActivate(context: ExecutionContext) {
    // Return the super
    return super.canActivate(context);
  }

  /**
   * handleRequest
   * @param  {any} error
   * @param  {any} user
   */
  handleRequest(error: any, user: any) {
    // If error exists and user not exist
    if (error || !user) {
      // Call error UnauthorizedException
      throw new UnauthorizedException(error);
    }

    // Return the user object
    return user;
  }
}
