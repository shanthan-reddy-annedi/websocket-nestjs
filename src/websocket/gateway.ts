import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GatewaySessionManager } from './gateway.session';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Conversation } from 'src/models/conversation.entity';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly sessions: GatewaySessionManager
  ) {}
  @WebSocketServer()
  server: Server;
  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    console.log('Incoming Connection');
    this.sessions.setUserSocket(socket.handshake.headers.user as string, socket);
    socket.emit('connected', {});
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    console.log('handleDisconnect');
    console.log(`${socket.userId} disconnected.`);
    this.sessions.removeUserSocket(socket.userId);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
    this.server.emit(`${data}`)
  }

  @OnEvent('message.create')
  sendMessage(payload: Conversation){
    console.log('Inside conversation.create');
    const recipientSocket = this.sessions.getUserSocket(payload.recipientId);
    console.log(`userId: ${payload.recipientId}`);
    console.log(`recipientSocket ${recipientSocket.id}`);
    if (recipientSocket) recipientSocket.emit('onConversation', payload);
  }
}
