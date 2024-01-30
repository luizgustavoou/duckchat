import { api } from "@/utils/api";
import { ISendMessage } from "../../../interfaces/ISendMessage";
import { IMessageResponse } from "./models/IMessageResponse";
import { IGetAllMessagesOfFriendship } from "../../../interfaces/IGetAllMessagesOfFriendship";

export interface IMessageApi {
  sendMessage(sendMessageData: ISendMessage): Promise<
    IMessageResponse & {
      userFriends: {
        id: string;
        createdAt: string;
        updatedAt: string;
      };
    }
  >;

  getAllMessagesOfFriendship(
    data: IGetAllMessagesOfFriendship
  ): Promise<IMessageResponse[]>;
}

export class MessageApiImpl implements IMessageApi {
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
