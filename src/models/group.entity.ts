import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Users } from './users.entity';
import { GroupMember } from './groupMember.entity';
import { Message } from './message.entity';

@Entity()
export class Group extends BaseEntity {
  @Column({name:'group_name'})
  groupName: string;

  @ManyToOne(() => Users, (users) => users.group)
  creator: Users;
  
  @ManyToOne(() => GroupMember, (groupMember) => groupMember.group)
  groupMember: GroupMember;

  @OneToMany(() => Message, (message) => message.group)
  message: Message;
}
