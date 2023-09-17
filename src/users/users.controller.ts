import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { Routes } from 'src/utils/routs';

@Controller(Routes.USER)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() userDto: CreateUserDto){
        const user = await this.userService.createUser(userDto);
        return user;
    }

}
