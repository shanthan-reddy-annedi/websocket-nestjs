import { Module } from '@nestjs/common';
import { ChatListController } from './chat-list.controller';
import { ChatListService } from './chat-list.service';

@Module({
  controllers: [ChatListController],
  providers: [ChatListService]
})
export class ChatListModule {}
