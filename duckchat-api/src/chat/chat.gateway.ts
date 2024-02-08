import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(client: any) {
    console.log(`Client com socket ${client.id} desconectado!`);
  }
  handleConnection(client: any, ...args: any[]) {
    console.log(`Client com socket ${client.id} conectado!`);
  }

  @WebSocketServer()
  server: Server;

  emitMessageToFriendship(value: {
    type: 'message_created' | 'message_updated' | 'message_removed';
    friendshipId: string;
    message: {
      id: string;
      content: string;
      user: {
        id: string;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        avatarURL: string;
        created_at: Date;
        updated_at: Date;
      };
      createdAt: Date;
      updatedAt: Date;
    };
  }) {
    this.server
      .to(value.friendshipId)
      .emit('newMessage', { type: value.type, message: value.message });
  }

  @SubscribeMessage('enter_room')
  handleJoinRoomEvent(
    @MessageBody() friendshipId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`[${client.id}] conectado na room ${friendshipId}`);

    client.join(friendshipId);
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoomEvent(
    @MessageBody() friendshipId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`[${client.id}] desconectado na room ${friendshipId}`);

    client.leave(friendshipId);
  }
}
