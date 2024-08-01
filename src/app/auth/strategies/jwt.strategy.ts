// Core
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Services
import { AuthService } from '../auth.service';

// Passport
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
// JWT strategoy, valid de jwt token
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    // Send property to the super class
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * validate
   * @description Validate the auth
   * @param  {any} payload
   */
  async validate(payload: any) {
    if (!payload.id) throw new UnauthorizedException();

    // Get the user
    const user = await this.authService.session(payload.id);

    // If the user is inactive return UNAUTHORIZED
    if (user.user.status != true) throw new UnauthorizedException();

    delete user.user.password;

    // Return the user
    return user;
  }
}
