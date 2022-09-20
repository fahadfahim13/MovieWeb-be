import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ExistingUserDTO } from '../users/dtos/existing-user.dto';
import { NewUserDTO } from '../users/dtos/new-user.dto';
import { UserDetails } from '../users/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | string> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | string> {
    return this.authService.login(user);
  }
}
