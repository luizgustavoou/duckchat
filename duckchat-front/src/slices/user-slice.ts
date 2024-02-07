// ler: https://blog.logrocket.com/using-typescript-redux-toolkit/

import { IUser } from "@/entities/IUser";
import { IUpdateProfile } from "@/interfaces/IUpdateProfile";
import { userService } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: IUser | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: UserState = {
  user: {
    id: "64f7485f-9083-409e-ba2d-67a37429a399",
    username: "luizgustavoou",
    password: "123",
    firstName: "Luiz Gustavo",
    lastName: "Umbelino",
    about: "every little thing gonna be all right",
    avatarURL: "https://github.com/shadcn.png",
  },
  status: "idle",
};

export const updateProfile = createAsyncThunk<
  IUser,
  IUpdateProfile,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("user/updateprofile", async (data, thunkAPI) => {
  try {
    const res = await userService.updateProfile(data);

    return res;
  } catch (error: any) {
    console.log(error);
    return thunkAPI.rejectWithValue(
      error?.message || "Ocorreu algum erro interno no servidor."
    );
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
      })
      .addCase(updateProfile.rejected, (state, _) => {
        state.status = "error";
      });
  },
});

export const {} = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
