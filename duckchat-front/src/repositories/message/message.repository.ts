import { IMessageApi } from "@/apis/message/message.api";
import { IMessage } from "@/entities/IMessage";
import { IGetAllMessagesOfFriendship } from "@/interfaces/IGetAllMessagesOfFriendship";
import { IRemoveMessage } from "@/interfaces/IRemoveMessage";
import { ISendMessage } from "@/interfaces/ISendMessage";
import { IUpdateMessage } from "@/interfaces/IUpdateMessage";

export interface IMessageRepository {
  sendMessage(sendMessageData: ISendMessage): Promise<IMessage>;

  updateMessage(data: IUpdateMessage): Promise<IMessage>;

  removeMessage(data: IRemoveMessage): Promise<Pick<IMessage, "id">>;

  getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessage[]>;
}

export class MessageRepositoryImpl implements IMessageRepository {
  constructor(private messageApi: IMessageApi) {}

  async updateMessage(data: IUpdateMessage): Promise<IMessage> {
    const res = await this.messageApi.updateMessage(data);

    const newRes: IMessage = {
      id: res.id,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      content: res.content,
      user: res.user,
    };

    return newRes;
  }

  async removeMessage(data: IRemoveMessage): Promise<Pick<IMessage, "id">> {
    const res = await this.messageApi.removeMessage(data);

    const newRes: Pick<IMessage, "id"> = {
      id: res.id,
    };

    return newRes;
  }

  async getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessage[]> {
    const res = await this.messageApi.getAllMessagesOfFriendship(data);

    const newRes: IMessage[] = res.map((messageResponse) => ({
      id: messageResponse.id,
      createdAt: messageResponse.createdAt,
      updatedAt: messageResponse.updatedAt,
      content: messageResponse.content,
      user: messageResponse.user,
    }));

    return newRes;
  }

  async sendMessage(data: ISendMessage): Promise<IMessage> {
    const res = await this.messageApi.sendMessage(data);

    const newRes: IMessage = {
      id: res.id,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      content: res.content,
      user: res.user,
    };

    return newRes;
  }
}
