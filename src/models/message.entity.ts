import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { DirectConversation } from './directConversation.entity';
import { Group } from './group.entity';
import { Users } from './users.entity';
import { BaseEntity } from './base.entity';
import { ChatType, ContentType } from 'src/utils/enum';

@Entity()
export class Message extends BaseEntity {
  @Column({ nullable: true })
  content: string;

  @Column({
    type: 'enum',
    enum: ChatType,
  })
  chat_type: ChatType;

  @Column({
    type: 'enum',
    enum: ContentType,
  })
  content_type: ContentType;

  @Column({ nullable: true })
  message_content: string;

  @Column({ nullable: true })
  audio_url: string;

  @Column({ nullable: true })
  video_url: string;

  @Column({ nullable: true })
  gif_url: string;

  @ManyToOne(()=> Group, (group) => group.message)
  group: Group;

  @ManyToOne(()=> DirectConversation, (directConversation) => directConversation.message)
  conversation: DirectConversation;

  @ManyToOne(()=> Users, (users) => users.message)
  sender: Users;
}
