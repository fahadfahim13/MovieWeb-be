import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserDetails } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDetails | null> {
    return this.usersService.findbyId(id);
  }
}
