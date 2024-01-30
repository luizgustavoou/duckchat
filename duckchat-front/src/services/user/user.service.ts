import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "../../../interfaces/IAddFriend";
import { IUserRepository } from "@/repositories/user/user.repository";

export interface IUserService {
  getAllFriendsOfUser(): Promise<IFriendship[]>;
  addFriend(addFriendData: IAddFriend): Promise<IFriendship>;
}

export class UserServiceImpl implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllFriendsOfUser(): Promise<IFriendship[]> {
    try {
      const res = await this.userRepository.getAllFriendsOfUser();

      return res;
    } catch (error) {
      throw error;
    }
  }

  async addFriend(addFriendData: IAddFriend) {
    try {
      const res = await this.userRepository.addFriend(addFriendData);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
