import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/models/conversation.entity';
import { Message } from 'src/models/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async createMessage(message: {
    authorId: string;
    recipientId: string;
    content: string;
  }) {
    const mess = this.messageRepository.create(message);
    const savedMessage = await this.messageRepository.save(mess);

    let conversation = await this.conversationRepository.findOne({
      where: {
        authorId: message.authorId,
        recipientId: message.recipientId,
      },
    });

    if (!conversation) {
      conversation = this.conversationRepository.create({
        authorId: message.authorId,
        recipientId: message.recipientId,
        messagesIds: [savedMessage.id],
      });
    } else {
      conversation.messagesIds.push(savedMessage.id);
    }
    conversation = await this.conversationRepository.save(conversation);
    this.eventEmitter.emit('message.create', {content: mess.content, recipientId: message.recipientId});
  }
}
