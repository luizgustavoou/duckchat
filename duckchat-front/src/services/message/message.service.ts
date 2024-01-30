import { IMessage } from "@/entities/IMessage";
import { IMessageRepository } from "@/repositories/message/message.repository";
import { IGetAllMessagesOfFriendship } from "interfaces/IGetAllMessagesOfFriendship";
import { ISendMessage } from "interfaces/ISendMessage";

export interface IMessageService {
  sendMessage(sendMessageData: ISendMessage): Promise<IMessage>;

  getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessage[]>;
}

export class MessageServiceImpl implements IMessageService {
  constructor(private messageRepository: IMessageRepository) {}

  async getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessage[]> {
    try {
      const res = await this.messageRepository.getAllMessagesOfFriendship(data);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(data: ISendMessage): Promise<IMessage> {
    try {
      const res = await this.messageRepository.sendMessage(data);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
