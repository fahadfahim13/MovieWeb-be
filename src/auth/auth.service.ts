import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDTO } from '../users/dtos/existing-user.dto';
import { NewUserDTO } from '../users/dtos/new-user.dto';
import { UserDetails } from '../users/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findbyEmail(email);
    if (!user) throw new BadRequestException('Invalid email');
    const matchPassword = await this.doesPasswordMatch(password, user.password);
    if (!matchPassword) throw new BadRequestException('Invalid password');
    return this.userService._getUserDetails(user);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | string> {
    const existingUser = await this.userService.findbyEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email is taken');
    }
    const hashedPassword = await this.hashPassword(user.password);
    const newUser = await this.userService.create(
      user.name,
      user.email,
      hashedPassword,
    );
    return this.userService._getUserDetails(newUser);
  }

  async login(
    existingUser: Readonly<ExistingUserDTO>,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
