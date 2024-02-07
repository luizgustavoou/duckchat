import { api } from "@/utils/api";
import { IAddFriend } from "../../interfaces/IAddFriend";
import { IFriendshipResponse } from "./models/IFriendshipResponse";
import { IUpdateProfile } from "../../interfaces/IUpdateProfile";
import { IUserResponse } from "../auth/models/IUserResponse";

export interface IUserApi {
  updateProfile(data: IUpdateProfile): Promise<IUserResponse>;

  getAllUsers(): Promise<IUserResponse[]>;

  getAllNonFriendsUsers(): Promise<IUserResponse[]>;

  getAllFriendsOfUser(): Promise<IFriendshipResponse[]>;

  addFriend(data: IAddFriend): Promise<IFriendshipResponse>;
}

export class UserApiImpl implements IUserApi {
  async updateProfile(data: IUpdateProfile): Promise<IUserResponse> {
    const res = await api.patch<IUserResponse>(`/users`, data);

    return res.data;
  }

  async getAllUsers(): Promise<IUserResponse[]> {
    const res = await api.get<IUserResponse[]>("/users");

    return res.data;
  }

  async getAllNonFriendsUsers(): Promise<IUserResponse[]> {
    const res = await api.get<IUserResponse[]>("/users/non-friends");

    return res.data;
  }

  async getAllFriendsOfUser(): Promise<IFriendshipResponse[]> {
    const res = await api.get<IFriendshipResponse[]>("/friendship");

    return res.data;
  }

  async addFriend(data: IAddFriend): Promise<IFriendshipResponse> {
    const { userId } = data;

    const res = await api.post<IFriendshipResponse>(`/friendship/${userId}`);

    return res.data;
  }
}
