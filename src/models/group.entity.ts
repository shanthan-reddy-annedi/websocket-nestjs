import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Users } from './users.entity';
import { Message } from './message.entity';

@Entity()
export class Group extends BaseEntity {
  @Column({ name: 'group_name' })
  groupName: string;

  @ManyToOne(() => Users, (users) => users.createdGroups)
  creator: Users;

  @ManyToMany(() => Users, (user) => user.groups)
  @JoinTable({ name: 'user_group' })
  members: Users[];

  @OneToMany(() => Message, (message) => message.group)
  message: Message;
}
