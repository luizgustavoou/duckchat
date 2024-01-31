import { api } from "@/utils/api";
import { IAddFriend } from "../../interfaces/IAddFriend";
import { IFriendshipResponse } from "./models/IFriendshipResponse";
import { IUpdateProfile } from "../../interfaces/IUpdateProfile";

export interface IUserApi {
  updateProfile(data: IUpdateProfile): Promise<{
    raw: any;
    affected?: number;
    generatedMaps: {
      [key: string]: any;
    }[];
  }>;

  getAllFriendsOfUser(): Promise<IFriendshipResponse[]>;

  addFriend(data: IAddFriend): Promise<IFriendshipResponse>;
}

export class UserApiImpl implements IUserApi {
  async updateProfile(data: IUpdateProfile): Promise<{
    raw: any;
    affected?: number | undefined;
    generatedMaps: { [key: string]: any }[];
  }> {
    const res = await api.patch(`/users`, data);

    return res.data;
  }

  async getAllFriendsOfUser(): Promise<IFriendshipResponse[]> {
    const res = await api.get<IFriendshipResponse[]>("/friendship");

    const data = res.data;

    return data;
  }

  async addFriend(data: IAddFriend) {
    const { userId } = data;

    const res = await api.get<IFriendshipResponse>(`/friendship/${userId}`);

    return res.data;
  }
}
