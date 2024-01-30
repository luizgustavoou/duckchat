import { api } from "@/utils/api";
import { ISendMessage } from "../../../interfaces/ISendMessage";
import { IMessageResponse } from "./models/IMessageResponse";
import { IGetAllMessagesOfFriendship } from "../../../interfaces/IGetAllMessagesOfFriendship";
import { IUpdateMessage } from "../../../interfaces/IUpdateMessage";
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

  updateMessage(data: IUpdateMessage): Promise<{
    raw: any;
    affected?: number;
    generatedMaps: {
      [key: string]: any;
    }[];
  }>;

  getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessageResponse[]>;
}

export class MessageApiImpl implements IMessageApi {
  async updateMessage(data: IUpdateMessage): Promise<{
    raw: any;
    affected?: number | undefined;
    generatedMaps: { [key: string]: any }[];
  }> {
    const { messageId, content } = data;

    const res = await api.patch<{
      raw: any;
      affected?: number | undefined;
      generatedMaps: { [key: string]: any }[];
    }>(`/message/${messageId}`, { content });

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
