import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: any) {
    // implement...
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`)


    // implement...
  }

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.server.emit("onMessage", {
      msg: "New Message",
      content: data
    });

    this.server.to("room1").emit("onMessage", {
      msg: "New Message 2",
      content: data
    })


  }

  @SubscribeMessage("subscribe")
  handleSubscribe(@MessageBody('to') to: string, @ConnectedSocket() client: Socket) {
    client.join(to);

    console.log(`Cliente ${client.id} inscrito na sala ${to}`);


  }
}
