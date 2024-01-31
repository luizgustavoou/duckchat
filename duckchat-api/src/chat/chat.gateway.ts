import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  emitMessageToFriendship(
    friendshipId: string,
    content: {
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
    },
  ) {
    this.server.to(friendshipId).emit('newMessage', content);
  }

  @SubscribeMessage('teste')
  handleTestEvent(@ConnectedSocket() client: Socket) {
    // console.log(client.rooms);
  }

  @SubscribeMessage('enter_room')
  handleJoinRoomEvent(
    @MessageBody() friendshipId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(friendshipId);
  }
}
