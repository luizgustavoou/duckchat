import { IUserResponse } from "@/apis/auth/models/IUserResponse";

export interface IFriendshipResponse {
  id: string;
  friend: IUserResponse;
}
