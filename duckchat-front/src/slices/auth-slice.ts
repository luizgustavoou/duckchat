// ler: https://blog.logrocket.com/using-typescript-redux-toolkit/

import { IUser } from "@/entities/IUser";
import { IUpdateProfile } from "@/interfaces/IUpdateProfile";
import { jwtService, storageService, userService } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUser | null;
  status: "idle" | "loading" | "success" | "error";
}

const accessToken = storageService.getItem("accessToken");

const user: IUser | null = accessToken ? jwtService.decode(accessToken) : null;

const initialState: AuthState = {
  user,
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
>("auth/updateprofile", async (data, thunkAPI) => {
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

export const authSlice = createSlice({
  name: "auth",
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

export const {} = authSlice.actions;
export const authSelector = (state: RootState) => state.authReducer;
export default authSlice.reducer;
