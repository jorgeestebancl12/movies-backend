// Core
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// Dto
import { AuthLoginDto } from './dto/authLogin.dto';
import { AuthRegisterDto } from './dto/authRegister.dto';

// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Login
   * @description Start a conversation
   * @param  {AuthLoginDto} authLoginDto
   */
  async login(authLoginDto: AuthLoginDto) {
    // Get the user by email
    const user = await this.userService.login(authLoginDto.email).catch(() => {
      throw new UnauthorizedException('Usuario o contraseña incorrecto.');
    });

    // Validate the password
    const check_password = await compare(authLoginDto.password, user.password);

    // If the password is not valid throw exception
    if (!check_password) {
      throw new UnauthorizedException('Usuario o contraseña incorrecto.');
    }

    // Generate token
    const token = this.jwtService.sign({ id: user.id });

    // Return user auth
    return {
      token: token,
      user: {
        fullname: user.fullname,
        status: user.status,
        email: user.email,
        role: user.role,
        id: user.id,
      },
    };
  }

  /**
   * Register
   * @description Start a conversation
   * @param  {AuthRegisterDto} authRegisterDto
   */
  async register(authRegisterDto: AuthRegisterDto) {
    // Valid if the password is same
    if (authRegisterDto.password !== authRegisterDto.password_retry) {
      throw new NotFoundException();
    }

    // Create the user
    const user = await this.userService.create({
      password: authRegisterDto.password,
      fullname: authRegisterDto.fullname.trim(),
      email: authRegisterDto.email.toLowerCase().trim(),
    });

    // Generate the token
    const token = this.jwtService.sign({ id: user.id });

    // Return the session
    return {
      token: token,
      user: {
        fullname: user.fullname,
        status: user.status,
        email: user.email,
        role: user.role,
        id: user.id,
      },
    };
  }

  /**
   * Session
   * @description Get the session of the user
   * @param  {string} id
   */
  async session(id: string) {
    // Find the user
    return this.userService.session(id);
  }
}
