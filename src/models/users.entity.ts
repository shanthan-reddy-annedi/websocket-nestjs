import { Exclude } from 'class-transformer';
import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';
import { DirectConversation } from './directConversation.entity';
import { Group } from './group.entity';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @Column({ unique: true, nullable: false, name: 'user_name' })
  userName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Message, (message) => message.sender)
  message: Message;

  @OneToMany(
    () => DirectConversation,
    (directConversation) => directConversation.user1,
  )
  directConversation1: DirectConversation[];

  @OneToMany(
    () => DirectConversation,
    (directConversation) => directConversation.user2,
  )
  directConversation2: DirectConversation[];

  @ManyToMany(() => Group, (group) => group.members)
  groups: Group[];

  @OneToMany(() => Group, (group) => group.creator)
  createdGroups: Group[];
}
