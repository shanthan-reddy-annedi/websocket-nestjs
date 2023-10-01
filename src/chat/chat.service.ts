import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectConversation } from 'src/models/directConversation.entity';
import { Group } from 'src/models/group.entity';
import { GroupMember } from 'src/models/groupMember.entity';
import { Message } from 'src/models/message.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
    @InjectRepository(DirectConversation)
    private directConversationRepository: Repository<DirectConversation>,
    private usersService: UsersService,
  ) {}
}
