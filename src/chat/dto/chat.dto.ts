import { ArrayNotEmpty, IsEnum, IsString, Validate } from 'class-validator';
import { UserDto } from 'src/users/dto/users.dto';
import { ChatType, ContentType } from 'src/utils/enum';
import { ChatTypeAndIds, EnumPropertyValidator } from './chat.validations';

export class CreateGroupDto extends UserDto {
  @IsString()
  groupName: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  members: string[];
}

export class chatDto extends UserDto {
  @IsEnum(ChatType)
  chat_type: ChatType;

  @IsEnum(ContentType)
  @Validate(EnumPropertyValidator, [
    'content_type',
    ContentType.TEXT,
    'message_content',
    'audio',
    'video',
    'gif',
  ])
  @Validate(EnumPropertyValidator, [
    'content_type',
    ContentType.AUDIO,
    'audio',
    'message_content',
    'video',
    'gif',
  ])
  @Validate(EnumPropertyValidator, [
    'content_type',
    ContentType.VIDEO,
    'video',
    'message_content',
    'audio',
    'gif',
  ])
  @Validate(EnumPropertyValidator, [
    'content_type',
    ContentType.GIF,
    'gif',
    'message_content',
    'audio',
    'video',
  ])
  content_type: ContentType;

  message_content?: string;

  audio?: string;

  video?: string;

  gif?: string;

  @Validate(ChatTypeAndIds)
  group_id?: string;

  @Validate(ChatTypeAndIds)
  recipent_id?: string;
}
