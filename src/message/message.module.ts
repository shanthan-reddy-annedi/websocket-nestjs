import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from 'src/models/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [TypeOrmModule.forFeature([Message])]
})
export class MessageModule {}
