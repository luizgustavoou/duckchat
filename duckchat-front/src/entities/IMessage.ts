import { IUser } from "./IUser";

export interface IMessage {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  user: IUser;
}
