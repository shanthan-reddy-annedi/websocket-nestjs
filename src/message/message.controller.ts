import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { PostMessage } from './dto/message.dto';
import { Routes } from 'src/utils/routs';

@Controller(Routes.MESSAGE)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() messageData: PostMessage) {
    try {
      await this.messageService.createMessage(messageData);
      return { success: true, message: 'Message created successfully' };
    } catch (error) {
      return { success: false, message: `Failed to create message: ${error}` };
    }
  }

  @Get()
  async getUserMessages(){
    //TODO: implement
  }
}
