import { Body, Controller, Get, Post } from '@nestjs/common';
import { Routes } from 'src/utils/routs';
import { ChatService } from './chat.service';
import { CreateGroupDto, chatDto } from './dto/chat.dto';
import { UserDto } from 'src/users/dto/users.dto';

@Controller(Routes.CHAT)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post(Routes.GROUP)
  async createGroupChat(@Body() createGroup: CreateGroupDto) {
    console.log(createGroup);
  }

  @Get(Routes.GETCHATLIST)
  async getChatList(@Body() user: UserDto) {
    console.log(user);
  }

  @Post()
  async chat(@Body() chat: chatDto) {
    console.log(chat);
  }
}
