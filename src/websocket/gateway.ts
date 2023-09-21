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
import { Conversation } from 'src/models/conversation.entity';
import { Subcriptions } from 'src/utils/Events';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly sessions: GatewaySessionManager) {}
  @WebSocketServer()
  server: Server;
  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    console.log('Incoming Connection');
    this.sessions.setUserSocket(
      socket.handshake.headers.user as string,
      socket,
    );
    socket.emit('connected', {});
    // we can use rooms to make different divices of users connect to same room. so that all the devices gets updated
    socket.join(socket.handshake.headers.user);
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    console.log('handleDisconnect');
    console.log(`${socket.handshake.headers.user} disconnected.`);
    this.sessions.removeUserSocket(socket.userId);
  }

  //here createMessage is the event name we send messages to from the client
  @SubscribeMessage(Subcriptions.BROADCAST)
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
    // here down below createMessage is the event we listen to from client side
    this.server.emit(Subcriptions.BROADCAST, `${data}`);
  }

  @OnEvent(Subcriptions.MESSAGE_CREATE)
  sendMessage(payload: Conversation) {
    console.log('Inside conversation.create');
    const recipientSocket = this.sessions.getUserSocket(payload.recipientId);
    if (recipientSocket)
      this.server
        .to(payload.recipientId)
        .emit(Subcriptions.SEND_MESSAGE, payload);
  }
}
