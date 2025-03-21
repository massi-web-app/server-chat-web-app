import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {OnEvent} from "@nestjs/event-emitter";


@WebSocketGateway({
    cors:{
        origin:["http://localhost:3000"]
    }
})
export class MessagingGateway implements OnGatewayConnection{
    handleConnection(client: any, ...args: any[]) {
        console.log(client);
    }

    @WebSocketServer()
    server:Server;

    @SubscribeMessage('createMessage')
    handleCreateMessage(@MessageBody() data:any){
        console.log("Create Message");
    }

    @OnEvent('message.create')
    handleMessageCreateEvent(payload:any){
        console.log("Inside message.create  ====> payload",payload );
        this.server.emit("onMessage",payload);
    }
}