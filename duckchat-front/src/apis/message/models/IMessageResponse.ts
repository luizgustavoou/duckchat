import { IUserResponse } from "@/apis/auth/models/IUserResponse";

export interface IMessageResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  user: IUserResponse;
}
