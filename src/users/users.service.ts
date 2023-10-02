import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/models/users.entity';
import { In, Repository } from 'typeorm';
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

  async findUserById(userId: string) {
    const user: Users = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUsers(userName: string[]) {
    const users: Users[] = await this.userRepository.find({
      where: { userName: In(userName) },
      order: { createdAt: 'ASC' },
    });
    if (!users) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async getUserGroups(userId: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: [
        'groups',
        'directConversation1',
        'directConversation2',
        'directConversation1.user2',
        'directConversation2.user1',
      ],
    });
    console.log(`${JSON.stringify(user)}`);
    return user;
  }
}
