import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DirectConversation } from 'src/models/directConversation.entity';
import { Group } from 'src/models/group.entity';
import { GroupMember } from 'src/models/groupMember.entity';
import { Message } from 'src/models/message.entity';
import { Users } from 'src/models/users.entity';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: true,
  synchronize: true,
  entities: [Users, Message, Group, GroupMember, DirectConversation], // Match files with any extension
};
