import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { Routes } from 'src/utils/routs';
import { Public } from 'src/utils/public';

@Controller(Routes.USER)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Public()
  async createUser(@Body() userDto: CreateUserDto) {
    const user = await this.userService.createUser(userDto);
    return user;
  }

  @Get(':userName')
  async isUser(@Param('userName') userName: string) {
    try {
      await this.userService.findUser(userName);
      return true;
    } catch (e) {
      return false;
    }
  }
}
