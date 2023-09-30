import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';
import { DirectConversation } from './directConversation.entity';
import { Group } from './group.entity';
import { GroupMember } from './groupMember.entity';

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
  directConversation1: DirectConversation;

  @OneToMany(
    () => DirectConversation,
    (directConversation) => directConversation.user1,
  )
  directConversation2: DirectConversation;

  @OneToMany(() => Group, (group) => group.creator)
  group: Group;
  @OneToMany(() => GroupMember, (groupMember) => groupMember.user)
  groupMember: GroupMember;
}
