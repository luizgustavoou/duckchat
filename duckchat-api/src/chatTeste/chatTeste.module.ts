import { Module } from '@nestjs/common';
import { ChatGateway } from './chatTeste.gateway';

@Module({
    providers: [ChatGateway],
    exports: [ChatGateway]
})
export class ChatModuleTeste { }
