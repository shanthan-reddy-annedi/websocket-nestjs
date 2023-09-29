import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDetails: LoginDto) {
    try {
      const user = await this.userService.findUser(loginDetails.userName);
      const isTrue = comparePassword(loginDetails.userPassword, user.password);
      const { password, ...result } = user;
      const payLoad = { sub: user.id, username: user.userName };
      return {
        access_token: await this.jwtService.signAsync(payLoad),
      };
    } catch (e) {
      throw new HttpException('UnAuthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
