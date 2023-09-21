import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PeerServer } from 'peer';
import { Client } from 'socket.io/dist/client';

@Module({})
export class peerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const peerServer = PeerServer({
      port: 8080,
      path: '/peer',
    });

    peerServer.on('connection', (client) => {
      console.log(`received a connection ${client.getId()}`);
    });

    peerServer.on('disconnect', (client) => {
      console.log(`Connection Disconnected ${client.getId()}`);
    });
    consumer.apply(peerServer).forRoutes('/peer');
  }
}
