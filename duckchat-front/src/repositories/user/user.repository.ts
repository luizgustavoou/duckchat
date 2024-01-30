import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "../../../interfaces/IAddFriend";
import { IUserApi } from "@/apis/user/user.api";

export interface IUserRepository {
  getAllFriendsOfUser(): Promise<IFriendship[]>;
  addFriend(addFriendData: IAddFriend): Promise<IFriendship>;
}

export class UserRepositoryImpl implements IUserRepository {
  constructor(private userApi: IUserApi) {}

  async getAllFriendsOfUser(): Promise<IFriendship[]> {
    const res = await this.userApi.getAllFriendsOfUser();

    return res;
  }

  async addFriend(addFriendData: IAddFriend) {
    const res = await this.userApi.addFriend(addFriendData);

    return res;
  }
}
