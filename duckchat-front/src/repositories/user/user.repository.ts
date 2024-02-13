import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "../../interfaces/IAddFriend";
import { IUserApi } from "@/apis/user/user.api";
import { IUpdateProfile } from "@/interfaces/IUpdateProfile";
import { IUser } from "@/entities/IUser";
import { IRemoveFriend } from "@/interfaces/IRemoveFriend";
import { IGetNonFriendsUsersBySearch } from "@/interfaces/IGetNonFriendsUsersBySearch";

export interface IUserRepository {
  updateProfile(data: IUpdateProfile): Promise<IUser>;

  getAllUsers(): Promise<IUser[]>;

  getAllNonFriendsUsers(): Promise<IUser[]>;

  getNonFriendsUsersBySearch(
    data: IGetNonFriendsUsersBySearch
  ): Promise<IUser[]>;

  getAllFriendsOfUser(): Promise<IFriendship[]>;

  addFriend(addFriendData: IAddFriend): Promise<IFriendship>;

  removeFriend(data: IRemoveFriend): Promise<Pick<IFriendship, "id">>;
}

export class UserRepositoryImpl implements IUserRepository {
  constructor(private userApi: IUserApi) {}

  async updateProfile(data: IUpdateProfile): Promise<IUser> {
    const res = await this.userApi.updateProfile(data);

    const newRes: IUser = {
      id: res.id,
      username: res.username,
      firstName: res.firstName,
      lastName: res.lastName,
      about: res.about,
      avatarURL: res.avatarURL,
    };

    return newRes;
  }

  async getAllUsers(): Promise<IUser[]> {
    const res = await this.userApi.getAllUsers();

    const newRes: IUser[] = res.map((userResponse) => ({
      id: userResponse.id,
      username: userResponse.username,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      about: userResponse.about,
      avatarURL: userResponse.avatarURL,
    }));

    return newRes;
  }

  async getAllNonFriendsUsers(): Promise<IUser[]> {
    const res = await this.userApi.getAllNonFriendsUsers();

    const newRes: IUser[] = res.map((userResponse) => ({
      id: userResponse.id,
      username: userResponse.username,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      about: userResponse.about,
      avatarURL: userResponse.avatarURL,
    }));

    return newRes;
  }

  async getNonFriendsUsersBySearch(
    data: IGetNonFriendsUsersBySearch
  ): Promise<IUser[]> {
    const res = await this.userApi.getNonFriendsUsersBySearch(data);

    const newRes: IUser[] = res.map((userResponse) => ({
      id: userResponse.id,
      username: userResponse.username,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      about: userResponse.about,
      avatarURL: userResponse.avatarURL,
    }));

    return newRes;
  }

  async getAllFriendsOfUser(): Promise<IFriendship[]> {
    const res = await this.userApi.getAllFriendsOfUser();

    const newRes: IFriendship[] = res.map((friendshipResponse) => ({
      id: friendshipResponse.id,
      friend: {
        id: friendshipResponse.friend.id,
        username: friendshipResponse.friend.username,
        firstName: friendshipResponse.friend.firstName,
        lastName: friendshipResponse.friend.lastName,
        about: friendshipResponse.friend.about,
        avatarURL: friendshipResponse.friend.avatarURL,
      },
    }));

    return newRes;
  }

  async addFriend(data: IAddFriend): Promise<IFriendship> {
    const res = await this.userApi.addFriend(data);

    const newRes: IFriendship = {
      id: res.id,
      friend: {
        id: res.friend.id,
        username: res.friend.username,
        firstName: res.friend.firstName,
        lastName: res.friend.lastName,
        about: res.friend.about,
        avatarURL: res.friend.avatarURL,
      },
    };

    return newRes;
  }

  async removeFriend(data: IRemoveFriend): Promise<Pick<IFriendship, "id">> {
    const res = await this.userApi.removeFriend(data);

    const newRes: Pick<IFriendship, "id"> = {
      id: res.id,
    };

    return newRes;
  }
}
