import { Socket } from 'socket.io';
import { Users } from 'src/models/users.entity';

export interface AuthenticatedSocket extends Socket {
  user?: Users;
}
