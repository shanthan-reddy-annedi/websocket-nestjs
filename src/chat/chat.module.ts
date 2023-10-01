import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message.entity';
import { Group } from 'src/models/group.entity';
import { GroupMember } from 'src/models/groupMember.entity';
import { DirectConversation } from 'src/models/directConversation.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Group, GroupMember, DirectConversation]), UsersModule],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
