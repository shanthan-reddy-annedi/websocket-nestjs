import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './utils/typeorm.config';
import { UsersModule } from './users/users.module';
import { GatewayModule } from './websocket/gateway.module';
import { MessageModule } from './message/message.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { peerModule } from './peerjs/Peer.modules';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    GatewayModule,
    MessageModule,
    EventEmitterModule.forRoot(),
    peerModule,
    AuthModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
