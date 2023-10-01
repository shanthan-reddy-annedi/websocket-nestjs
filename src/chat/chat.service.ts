import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectConversation } from 'src/models/directConversation.entity';
import { Group } from 'src/models/group.entity';
import { Message } from 'src/models/message.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/chat.dto';
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

  async createGroupChat(createGroup: CreateGroupDto) {
    const users = await this.usersService.findUsers(createGroup.members);
    const creator = await this.usersService.findUser(createGroup.username);
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
}
