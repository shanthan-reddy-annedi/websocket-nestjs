import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/utils/interfaces';

@Injectable()
export class GatewaySessionManager {
  private static readonly sessions: Map<string, AuthenticatedSocket> =
    new Map();

  getUserSocket(id: string) {
    return GatewaySessionManager.sessions.get(id);
  }

  setUserSocket(userId: string, socket: AuthenticatedSocket) {
    GatewaySessionManager.sessions.set(userId, socket);
  }

  removeUserSocket(userId: string) {
    GatewaySessionManager.sessions.delete(userId);
  }
  getSockets(): Map<string, AuthenticatedSocket> {
    return GatewaySessionManager.sessions;
  }
}
