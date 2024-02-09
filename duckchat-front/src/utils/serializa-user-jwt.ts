import { IUser } from "@/entities/IUser";
import { IUserJWT } from "@/interfaces/IUserJwt";

export const serializeUserJwt = (userJwt: IUserJWT) => {
  const user: IUser = {
    id: userJwt.sub,
    username: userJwt.username,
    firstName: userJwt.firstName,
    lastName: userJwt.lastName,
    about: userJwt.about,
    avatarURL: userJwt.avatarURL,
  };

  return user;
};
