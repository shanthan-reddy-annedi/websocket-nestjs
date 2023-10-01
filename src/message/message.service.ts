import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/models/message.entity';
import { Repository } from 'typeorm';
import { PostMessage } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

  ) {}

  async createMessage(message: PostMessage) {
    // const mess = this.messageRepository.create(message);
    // const savedMessage = await this.messageRepository.save(mess);
  }
}
