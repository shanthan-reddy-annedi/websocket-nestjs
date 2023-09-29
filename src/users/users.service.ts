import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/models/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { HashPassword } from 'src/utils/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const userPresent = await this.userRepository.findOne({
      where: {
        userName: userDto.userName,
      },
    });
    console.log(userPresent);
    if (userPresent) {
      throw new HttpException(`User name already taken`, 402);
    }
    userDto.password = await HashPassword(userDto.password);
    let user: Users = this.userRepository.create(userDto);
    user = await this.userRepository.save(user);
    const { password, ...response } = user;
    return response;
  }

  async findUser(userName: string) {
    const user: Users = await this.userRepository.findOne({
      where: { userName: userName },
    });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
