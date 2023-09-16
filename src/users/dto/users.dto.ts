import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;
  
  @IsStrongPassword()
  password: string;
}
