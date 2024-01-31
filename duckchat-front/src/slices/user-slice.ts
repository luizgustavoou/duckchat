// ler: https://blog.logrocket.com/using-typescript-redux-toolkit/

import { IUser } from "@/entities/IUser";
import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
