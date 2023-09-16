import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from 'src/models/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/models/conversation.entity';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [TypeOrmModule.forFeature([Message,Conversation])]
})
export class MessageModule {}
