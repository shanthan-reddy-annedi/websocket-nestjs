import { ArrayNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/users.dto';

export class CreateGroupDto extends UserDto {
  @IsString()
  groupName: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  members: string[];
}
