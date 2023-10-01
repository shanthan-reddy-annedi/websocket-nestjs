import { Module } from '@nestjs/common';
import { GatewaySessionManager } from './gateway.session';
import { MessagingGateway } from './gateway';
import { UsersModule } from 'src/users/users.module';

@Module({
    providers:[MessagingGateway, GatewaySessionManager],
    imports: [UsersModule]
})
export class GatewayModule {}
