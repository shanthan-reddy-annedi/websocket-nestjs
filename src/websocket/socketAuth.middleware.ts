import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { Users } from 'src/models/users.entity';
import { UsersService } from 'src/users/users.service';

export interface AuthSocket extends Socket {
  user: Users;
}
export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => void;
export const WSAuthMiddleware = (
  jwtService: JwtService,
  userService: UsersService,
): SocketMiddleware => {
  return async (socket: AuthSocket, next) => {
    try {
      const jwtPayload = jwtService.verify(
        (socket.handshake.headers.authentication as string) ?? '',
      );

      const userResult = await userService.findUser(jwtPayload.userID);
      if (userResult) {
        socket.user = userResult;
        next();
      } else {
        next({
          name: 'Unauthorizaed',
          message: 'Unauthorizaed',
        });
      }
    } catch (error) {
      next({
        name: 'Unauthorizaed',
        message: 'Unauthorizaed',
      });
    }
  };
};
