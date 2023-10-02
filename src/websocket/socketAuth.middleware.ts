import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedSocket } from 'src/utils/interfaces';

export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => void;

export const WSAuthMiddleware = (
  jwtService: JwtService,
  userService: UsersService,
): SocketMiddleware => {
  return async (socket: AuthenticatedSocket, next) => {
    try {
      const jwtPayload = jwtService.verify(
        (socket.handshake.headers.authentication as string) ?? '',
      );
      const userResult = await userService.findUserById(jwtPayload.sub);
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
