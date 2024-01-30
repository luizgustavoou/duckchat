import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "../../../interfaces/IAddFriend";
import { IUserApi } from "@/apis/user/user.api";

export interface IUserService {
  getAllFriendsOfUser(): Promise<IFriendship[]>;
  addFriend(addFriendData: IAddFriend): Promise<IFriendship>;
}

export class UserServiceImpl implements IUserService {
  constructor(private userApi: IUserApi) {}

  async getAllFriendsOfUser(): Promise<IFriendship[]> {
    try {
      const res = await this.userApi.getAllFriendsOfUser();

      return res;
    } catch (error) {
      throw error;
    }
  }

  async addFriend(addFriendData: IAddFriend) {
    try {
      const res = await this.userApi.addFriend(addFriendData);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
