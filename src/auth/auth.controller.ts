import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/public';
import { Routes } from 'src/utils/routs';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto);
  }
}
