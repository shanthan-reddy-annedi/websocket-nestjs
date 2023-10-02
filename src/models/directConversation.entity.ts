import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Users } from './users.entity';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';

@Entity()
@Unique(['user1', 'user2'])
export class DirectConversation extends BaseEntity {
  @ManyToOne(() => Users, (users) => users.directConversation1)
  user1: Users;

  @ManyToOne(() => Users, (users) => users.directConversation2)
  user2: Users;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
