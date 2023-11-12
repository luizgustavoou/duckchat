import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { Public } from "src/decorators/public.decorator";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Public()
@Controller("chat")
export class ChatController {
    constructor(private chatService: ChatService) { }


    @Post()
    create(@Body() createMessageDto: CreateChatDto) {
        return this.chatService.create(createMessageDto);
    }

    @Get()
    findAll() {
        return this.chatService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.chatService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
        return this.chatService.update(id, updateChatDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.chatService.remove(id);
    }




}
