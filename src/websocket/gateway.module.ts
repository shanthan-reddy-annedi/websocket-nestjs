import { Module } from '@nestjs/common';
import { GatewaySessionManager } from './gateway.session';
import { MessagingGateway } from './gateway';

@Module({
    providers:[MessagingGateway, GatewaySessionManager]
})
export class GatewayModule {}
