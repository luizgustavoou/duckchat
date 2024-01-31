import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "../../interfaces/IAddFriend";
import { IUserApi } from "@/apis/user/user.api";
import { IUpdateProfile } from "@/interfaces/IUpdateProfile";

export interface IUserRepository {
  updateProfile(data: IUpdateProfile): Promise<{
    raw: any;
    affected?: number;
    generatedMaps: {
      [key: string]: any;
    }[];
  }>;

  getAllFriendsOfUser(): Promise<IFriendship[]>;

  addFriend(addFriendData: IAddFriend): Promise<IFriendship>;
}

export class UserRepositoryImpl implements IUserRepository {
  constructor(private userApi: IUserApi) {}

  async updateProfile(data: IUpdateProfile): Promise<{
    raw: any;
    affected?: number | undefined;
    generatedMaps: { [key: string]: any }[];
  }> {
    const res = await this.userApi.updateProfile(data);

    return res;
  }

  async getAllFriendsOfUser(): Promise<IFriendship[]> {
    const res = await this.userApi.getAllFriendsOfUser();

    return res;
  }

  async addFriend(addFriendData: IAddFriend) {
    const res = await this.userApi.addFriend(addFriendData);

    return res;
  }
}
