import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectConversation } from 'src/models/directConversation.entity';
import { Group } from 'src/models/group.entity';
import { Message } from 'src/models/message.entity';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { CreateGroupDto, chatDto } from './dto/chat.dto';
import { UserDto } from 'src/users/dto/users.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(DirectConversation)
    private directConversationRepository: Repository<DirectConversation>,
    private usersService: UsersService,
  ) {}

  async createGroup(createGroup: CreateGroupDto) {
    const users = await this.usersService.findUsers(createGroup.members);
    const creator = await this.usersService.findUserById(createGroup.userId);
    const group = this.groupRepository.create({
      groupName: createGroup.groupName,
      creator: creator,
      members: [...users, creator],
    });
    return await this.groupRepository.save(group);
  }

  async getChatList(user: UserDto) {
    const users = await this.usersService.getUserGroups(user.userId);
    const groups = users.groups.map((group) => ({
      name: group.groupName,
      id: group.id,
      type: 'GROUP',
    }));
    const directConversations = [
      ...users.directConversation1.map((conv) => ({
        name: conv.user2.name,
        id: conv.user2.id,
        type: 'ONE_ON_ONE',
      })),
      ...users.directConversation2.map((conv) => ({
        name: conv.user1.name,
        id: conv.user1.id,
        type: 'ONE_ON_ONE',
      })),
    ];
    const chatList = [...groups, ...directConversations];
    return chatList;
  }

  async getDirectChat(user1Id: string, user2Id: string) {
    const foundUser1 = await this.usersService.findUserById(user1Id);
    const foundUser2 = await this.usersService.findUserById(user2Id);

    if (!foundUser1 || !foundUser2) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const directConversation = await this.directConversationRepository
      .createQueryBuilder('dc')
      .leftJoinAndSelect('dc.user1', 'user1')
      .leftJoinAndSelect('dc.user2', 'user2')
      .where('user1.id = :user1Id OR user2.id = :user2Id', {
        user1Id: foundUser1.id,
        user2Id: foundUser2.id,
      })
      .orWhere('user1.id = :user2Id OR user2.id = :user1Id', {
        user1Id: foundUser1.id,
        user2Id: foundUser2.id,
      })
      .getOne();

    console.log(`directConversation: ${directConversation}`);

    if (!directConversation) {
      return [];
    }

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.conversation_id = :convId', {
        convId: directConversation.id,
      })
      .getMany();
    return messages.reverse();
  }

  async createDirectChat(chat: chatDto) {
    const recipentUser = await this.usersService.findUserById(chat.recipent_id);
    const sender = await this.usersService.findUserById(chat.userId);
    console.log(`recipentUser: ${JSON.stringify(recipentUser)}`);
    console.log(`sender: ${JSON.stringify(sender)}`);
    if (!recipentUser) {
      throw new HttpException(`No User found`, HttpStatus.NOT_FOUND);
    }

    let existingChat = await this.directConversationRepository
      .createQueryBuilder('dc')
      .leftJoinAndSelect('dc.user1', 'user1')
      .leftJoinAndSelect('dc.user2', 'user2')
      .where('user1.id = :user1Id OR user2.id = :user2Id', {
        user1Id: sender.id,
        user2Id: recipentUser.id,
      })
      .orWhere('user1.id = :user2Id OR user2.id = :user1Id', {
        user2Id: recipentUser.id,
        user1Id: sender.id,
      })
      .getOne();

    if (!existingChat) {
      const newChat = this.directConversationRepository.create({
        user1: sender,
        user2: recipentUser,
      });
      existingChat = await this.directConversationRepository.save(newChat);
    }
    console.log(existingChat);
    const message = this.messageRepository.create(chat);
    message.sender = sender;
    message.conversation = existingChat;

    return await this.messageRepository.save(message);
  }

  async createGroupChat(chat: chatDto) {}
}
