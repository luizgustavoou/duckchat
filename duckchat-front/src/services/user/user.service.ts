import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "../../interfaces/IAddFriend";
import { IUserRepository } from "@/repositories/user/user.repository";
import { IUpdateProfile } from "@/interfaces/IUpdateProfile";

export interface IUserService {
  updateProfile(data: IUpdateProfile): Promise<{
    raw: any;
    affected?: number;
    generatedMaps: {
      [key: string]: any;
    }[];
  }>;

  getAllFriendsOfUser(): Promise<IFriendship[]>;

  addFriend(data: IAddFriend): Promise<IFriendship>;
}

export class UserServiceImpl implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async updateProfile(data: IUpdateProfile): Promise<{
    raw: any;
    affected?: number | undefined;
    generatedMaps: { [key: string]: any }[];
  }> {
    try {
      const res = await this.userRepository.updateProfile(data);

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

  async addFriend(data: IAddFriend) {
    try {
      const res = await this.userRepository.addFriend(data);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
