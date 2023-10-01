import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GatewaySessionManager } from './gateway.session';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { Subcriptions } from 'src/utils/Events';
import { WSAuthMiddleware } from './socketAuth.middleware';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly sessions: GatewaySessionManager,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    const middle = WSAuthMiddleware(this.jwtService, this.usersService);
    server.use(middle);
  }

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    console.log(`Incoming Connection ${socket.user.name}`);
    this.sessions.setUserSocket(socket.user.id, socket);
    socket.join(socket.handshake.headers.user);
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    console.log(`${socket.user.name} disconnected.`);
    this.sessions.removeUserSocket(socket.user.id);
  }

  //here createMessage is the event name we send messages to from the client
  @SubscribeMessage(Subcriptions.TEST)
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
    // here down below createMessage is the event we listen to from client side
    this.server.emit(Subcriptions.BROADCAST, `${data}`);
  }

  @OnEvent(Subcriptions.MESSAGE_CREATE)
  sendMessage(payload: any) {
    console.log('Inside conversation.create');
    const recipientSocket = this.sessions.getUserSocket(payload.recipientId);
    if (recipientSocket)
      this.server
        .to(payload.recipientId)
        .emit(Subcriptions.SEND_MESSAGE, payload);
  }
}
