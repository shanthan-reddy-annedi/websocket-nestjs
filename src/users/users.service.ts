import { HttpException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/models/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const userPresent = await this.userRepository.findOne({where: {
      userName: userDto.userName
    }})
    console.log(userPresent)
    if(userPresent){
      throw new HttpException(`User name already taken`, 402);
    }
    let user: Users = this.userRepository.create(userDto);
    console.log(user);
    user = await this.userRepository.save(user);
    return user;
  }
}
