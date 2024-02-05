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

    const newRes: IFriendship[] = res.map((friendshipResponse) => ({
      id: friendshipResponse.id,
      friend: {
        id: friendshipResponse.friend.id,
        username: friendshipResponse.friend.username,
        password: friendshipResponse.friend.password,
        firstName: friendshipResponse.friend.firstName,
        lastName: friendshipResponse.friend.lastName,
        about: friendshipResponse.friend.about,
        avatarURL: friendshipResponse.friend.avatarURL,
      },
    }));

    return newRes;
  }

  async addFriend(addFriendData: IAddFriend): Promise<IFriendship> {
    const res = await this.userApi.addFriend(addFriendData);

    const newRes: IFriendship = {
      id: res.id,
      friend: {
        id: res.friend.id,
        username: res.friend.username,
        password: res.friend.password,
        firstName: res.friend.firstName,
        lastName: res.friend.lastName,
        about: res.friend.about,
        avatarURL: res.friend.avatarURL,
      },
    };

    return newRes;
  }
}
