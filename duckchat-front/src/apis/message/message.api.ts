import { api } from "@/utils/api";
import { ISendMessage } from "../../interfaces/ISendMessage";
import { IMessageResponse } from "./models/IMessageResponse";
import { IGetAllMessagesOfFriendship } from "../../interfaces/IGetAllMessagesOfFriendship";
import { IUpdateMessage } from "../../interfaces/IUpdateMessage";
import { IRemoveMessage } from "@/interfaces/IRemoveMessage";
export interface IMessageApi {
  sendMessage(data: ISendMessage): Promise<
    IMessageResponse & {
      userFriends: {
        id: string;
        createdAt: string;
        updatedAt: string;
      };
    }
  >;

  updateMessage(data: IUpdateMessage): Promise<IMessageResponse>;

  removeMessage(data: IRemoveMessage): Promise<Pick<IMessageResponse, "id">>;

  getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessageResponse[]>;
}

export class MessageApiImpl implements IMessageApi {
  async updateMessage(data: IUpdateMessage): Promise<IMessageResponse> {
    const { messageId, content } = data;

    const res = await api.patch<IMessageResponse>(`/message/${messageId}`, {
      content,
    });

    return res.data;
  }

  async removeMessage(
    data: IRemoveMessage
  ): Promise<Pick<IMessageResponse, "id">> {
    const { messageId } = data;

    const res = await api.delete<Pick<IMessageResponse, "id">>(
      `/message/${messageId}`
    );

    return res.data;
  }

  async getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessageResponse[]> {
    const { friendshipId } = data;

    const res = await api.get<IMessageResponse[]>(
      `/message/friendship/${friendshipId}`
    );

    return res.data;
  }

  async sendMessage(data: ISendMessage): Promise<
    IMessageResponse & {
      userFriends: { id: string; createdAt: string; updatedAt: string };
    }
  > {
    const res = await api.post<
      IMessageResponse & {
        userFriends: {
          id: string;
          createdAt: string;
          updatedAt: string;
        };
      }
    >("/message", data);

    return res.data;
  }
}
