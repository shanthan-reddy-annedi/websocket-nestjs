import { Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Group } from './group.entity';
import { Users } from './users.entity';

@Entity()
export class GroupMember extends BaseEntity {
  @ManyToOne(() => Users, (users) => users.groupMember)
  user: Users;

  @ManyToMany(() => Group, (group) => group.members)
  groups: Group[];
}
