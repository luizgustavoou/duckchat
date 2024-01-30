import { axiosInstance } from "@/utils/config";
import { IAddFriend } from "../../../interfaces/IAddFriend";
import { IFriendshipResponse } from "./models/IFriendshipResponse";

export interface IUserApi {
  getAllFriendsOfUser(): Promise<IFriendshipResponse[]>;
  addFriend(addFriendData: IAddFriend): Promise<IFriendshipResponse>;
}

export class UserApiImpl implements IUserApi {
  async getAllFriendsOfUser(): Promise<IFriendshipResponse[]> {
    const res = await axiosInstance.get<IFriendshipResponse[]>("/friendship");

    const data = res.data;

    return data;
  }

  async addFriend(addFriendData: IAddFriend) {
    const { userId } = addFriendData;

    const res = await axiosInstance.get<IFriendshipResponse>(
      `/friendship/${userId}`
    );

    const data = res.data;

    return data;
  }
}
