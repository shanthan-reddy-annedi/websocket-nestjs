import { Body, Controller, Post } from '@nestjs/common';
import { Routes } from 'src/utils/routs';
import { ChatService } from './chat.service';
import { CreateGroupDto } from './dto/chat.dto';

@Controller(Routes.CHAT)
export class ChatController {
    constructor(private chatService: ChatService){}

    @Post(Routes.GROUP)
    async createGroupChat(@Body() createGroup: any){
        console.log(createGroup);
    }
}
