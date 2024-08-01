// Core
import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { ILike } from 'typeorm';
import { ConfigService } from '@nestjs/config';

// Repositories
import { UserRepository } from './repositories/user.repository';

// Dto
import { UserCreateDto } from './dto/userCreate.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';

// Constants
import { UserRoleEnum } from './constants/user.constant';
import { AuthType } from '../auth/types/auth.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * create
   * @description Create a user in the database
   * @param {UserCreateDto} userCreateDto
   * @returns
   */
  async create(userCreateDto: UserCreateDto) {
    // Create the password hash
    const password_hash = await hash(
      userCreateDto.password,
      parseInt(this.configService.get<string>('PASSWORD_HASH_SALT')),
    );

    // Create the user
    const user = await this.userRepository
      .save({
        password: password_hash,
        email: userCreateDto.email,
        role: UserRoleEnum.Customer,
        fullname: userCreateDto.fullname,
      })
      .catch((error) => {
        if (error.code === '23505') {
          throw new ConflictException(error);
        }

        throw new InternalServerErrorException(error);
      });

    // Return the user new
    return user;
  }

  /**
   * findOne
   * @description Filter a user by id
   * @param {AuthType} auth
   * @returns
   */
  async findOne(auth: AuthType) {
    // Find the user by id
    const user = await this.userRepository
      .findOne({ where: { id: auth.user.id } })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // If the user no exist throw error
    if (!user) {
      throw new NotFoundException();
    }

    // Delete the password in the response
    delete user.password;

    // Return the user
    return user;
  }

  /**
   * update
   * @description Update a user by id
   * @param {UserUpdateDto} userUpdateDto
   * @param {AuthType} auth
   * @returns
   */
  async update(userUpdateDto: UserUpdateDto, auth: AuthType) {
    // Find the user by id
    const user = await this.userRepository
      .findOneBy({ id: auth.user.id })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // If the user no exist throw error
    if (!user) {
      throw new NotFoundException();
    }

    // Update the user entity
    const updated = await this.userRepository
      .save({
        ...user,
        ...userUpdateDto,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // Delete the password in the response
    delete updated.password;

    // Return the user
    return updated;
  }

  /**
   * remove
   * @description Inactive a user by id
   * @param {AuthType} auth
   * @returns
   */
  async remove(auth: AuthType) {
    // Find the user by id
    const user = await this.userRepository
      .findOneBy({ id: auth.user.id })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // If the user no exist throw error
    if (!user) {
      throw new NotFoundException();
    }

    // Remove the user
    await this.userRepository
      .update(user.id, { status: false })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // Delete the password
    delete user.password;

    // Return the user id removed
    return user;
  }

  /**
   * login
   * @description Filter a user by email
   * @param {string} email
   * @returns
   */
  async login(email: string) {
    // Find the user by id
    const user = await this.userRepository
      .findOneBy({ email: ILike(email.trim()), status: true })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    // If the user no exist throw error
    if (!user) {
      throw new NotFoundException('Usuario o contraseña incorrecto.');
    }

    // Return the user
    return user;
  }

  /**
   * session
   * @description Validate the session user by id
   * @param {string} id
   * @returns
   */
  async session(id: string) {
    // Find the user by id
    const user = await this.userRepository.findOneBy({ id }).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    // If the user no exist throw error
    if (!user) {
      throw new UnauthorizedException();
    }

    // Return the user
    return {
      user: user,
    };
  }
}
