import { IsOptional } from 'class-validator';
import { Users } from 'src/models/users.entity';

export class GlobalDto {
  @IsOptional()
  user?: Users;
}
