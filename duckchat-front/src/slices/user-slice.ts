// ler: https://blog.logrocket.com/using-typescript-redux-toolkit/

import { IUser } from "@/entities/IUser";
import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: {
    id: "64f7485f-9083-409e-ba2d-67a37429a399",
    username: "luizgustavoou",
    password: "123",
    firstName: "gugu delicia",
    about: "every little thing gonna be all right",
    lastName: "Umbelino",
    avatarURL: "https://github.com/shadcn.png",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
