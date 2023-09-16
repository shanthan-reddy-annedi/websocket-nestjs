import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PostMessage {
  @IsUUID()
  authorId: string;

  @IsUUID()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
