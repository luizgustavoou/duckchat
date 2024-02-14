import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "../../interfaces/IAddFriend";
import { IUserRepository } from "@/repositories/user/user.repository";
import { IUpdateProfile } from "@/interfaces/IUpdateProfile";
import { IUser } from "@/entities/IUser";
import { IRemoveFriend } from "@/interfaces/IRemoveFriend";
import { IGetNonFriendsUsersBySearch } from "@/interfaces/IGetNonFriendsUsersBySearch";
import { IGetProfileImage } from "@/interfaces/IGetProfileImage";

export interface IUserService {
  updateProfile(data: IUpdateProfile): Promise<IUser>;

  getAllUsers(): Promise<IUser[]>;

  getAllNonFriendsUsers(): Promise<IUser[]>;

  getNonFriendsUsersBySearch(
    data: IGetNonFriendsUsersBySearch
  ): Promise<IUser[]>;

  getAllFriendsOfUser(): Promise<IFriendship[]>;

  addFriend(data: IAddFriend): Promise<IFriendship>;

  removeFriend(data: IRemoveFriend): Promise<Pick<IFriendship, "id">>;

  getProfileImage(data: IGetProfileImage): Promise<Blob>;
}

export class UserServiceImpl implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async updateProfile(data: IUpdateProfile): Promise<IUser> {
    try {
      const res = await this.userRepository.updateProfile(data);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const res = await this.userRepository.getAllUsers();

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAllNonFriendsUsers(): Promise<IUser[]> {
    try {
      const res = await this.userRepository.getAllNonFriendsUsers();

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getNonFriendsUsersBySearch(
    data: IGetNonFriendsUsersBySearch
  ): Promise<IUser[]> {
    try {
      const res = await this.userRepository.getNonFriendsUsersBySearch(data);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAllFriendsOfUser(): Promise<IFriendship[]> {
    try {
      const res = await this.userRepository.getAllFriendsOfUser();

      return res;
    } catch (error) {
      throw error;
    }
  }

  async addFriend(data: IAddFriend): Promise<IFriendship> {
    try {
      const res = await this.userRepository.addFriend(data);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async removeFriend(data: IRemoveFriend): Promise<Pick<IFriendship, "id">> {
    try {
      const res = await this.userRepository.removeFriend(data);

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getProfileImage(data: IGetProfileImage): Promise<Blob> {
    try {
      const res = await this.userRepository.getProfileImage(data);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
