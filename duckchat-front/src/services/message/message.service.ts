import { IMessage } from "@/entities/IMessage";
import { IMessageRepository } from "@/repositories/message/message.repository";
import { IGetAllMessagesOfFriendship } from "@/interfaces/IGetAllMessagesOfFriendship";
import { ISendMessage } from "@/interfaces/ISendMessage";
import { IUpdateMessage } from "@/interfaces/IUpdateMessage";
import { IRemoveMessage } from "@/interfaces/IRemoveMessage";

export interface IMessageService {
  sendMessage(sendMessageData: ISendMessage): Promise<IMessage>;

  updateMessage(data: IUpdateMessage): Promise<IMessage>;

  removeMessage(data: IRemoveMessage): Promise<Pick<IMessage, "id">>;

  getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessage[]>;
}

export class MessageServiceImpl implements IMessageService {
  constructor(private messageRepository: IMessageRepository) {}

  async updateMessage(data: IUpdateMessage): Promise<IMessage> {
    try {
      const res = await this.messageRepository.updateMessage(data);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async removeMessage(data: IRemoveMessage): Promise<Pick<IMessage, "id">> {
    try {
      const res = await this.messageRepository.removeMessage(data);

      return res;
    } catch (error) {
      throw error;
    }
  }

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
