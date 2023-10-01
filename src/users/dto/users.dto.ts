import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsStrongPassword()
  password: string;
}

export class UserDto {
  @IsString()
  username: string;
  @IsUUID()
  userId: string;
}
