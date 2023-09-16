import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity({ name: 'conversations' })
// @Unique(['creator_id', 'recipient_id'])
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:'creator_id'})
  authorId: string;

  @Column({name:'recipient_id'})
  recipientId: string;

  @Column('text',{array: true, name:'message_ids'})
  messagesIds: string[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;
}

