import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Routes } from 'src/utils/routs';
import { ChatService } from './chat.service';
import { CreateGroupDto, chatDto } from './dto/chat.dto';
import { UserDto } from 'src/users/dto/users.dto';
import { ChatType } from 'src/utils/enum';

@Controller(Routes.CHAT)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post(Routes.GROUP)
  async createGroup(@Body() createGroup: CreateGroupDto) {
    const group = await this.chatService.createGroup(createGroup);
    return group;
  }

  @Get(Routes.GETCHATLIST)
  async getChatList(@Body() user: UserDto) {
    const chatList = await this.chatService.getChatList(user);
    return chatList;
  }

  @Post()
  async chat(@Body() chat: chatDto) {
    if (chat.chat_type === ChatType.GROUP) {
      await this.chatService.createGroupChat(chat);
    } else {
      await this.chatService.createDirectChat(chat);
    }
  }

  @Get(`${Routes.DIRECTCHAT}/:user2Id`)
  async getDirectChat(
    @Param('user2Id') user2Id: string,
    @Body() user1: UserDto,
  ) {
    return await this.chatService.getDirectChat(user1.userId, user2Id);
  }
}
