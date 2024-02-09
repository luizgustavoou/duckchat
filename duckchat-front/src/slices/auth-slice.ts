// ler: https://blog.logrocket.com/using-typescript-redux-toolkit/

import { IAuth } from "@/entities/IAuth";
import { IUser } from "@/entities/IUser";
import { ISignin } from "@/interfaces/ISignin";
import { IUpdateProfile } from "@/interfaces/IUpdateProfile";
import { IUserJWT } from "@/interfaces/IUserJwt";
import {
  authService,
  jwtService,
  storageService,
  userService,
} from "@/services";
import { AppDispatch, RootState } from "@/store";
import { serializeUserJwt } from "@/utils/serializa-user-jwt";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUser | null;
  status: "idle" | "loading" | "success" | "error";
}

const accessToken = storageService.getItem("accessToken");

const userJwt: IUserJWT | null = accessToken
  ? jwtService.decode(accessToken)
  : null;

const user: IUser | null = userJwt ? serializeUserJwt(userJwt) : userJwt;

const initialState: AuthState = {
  user,
  status: "idle",
};

export const signin = createAsyncThunk<
  IAuth,
  ISignin,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("auth/signin", async (data, thunkAPI) => {
  try {
    const res = await authService.signin(data);

    return res;
  } catch (error: any) {
    console.log(error);
    return thunkAPI.rejectWithValue(
      error?.message || "Ocorreu algum erro interno no servidor."
    );
  }
});

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
      .addCase(signin.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        const userJwt: IUserJWT = jwtService.decode(action.payload.accessToken);

        state.user = serializeUserJwt(userJwt);
        state.status = "success";
      })
      .addCase(signin.rejected, (state, _) => {
        state.status = "error";
      })
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
