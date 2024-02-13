// ler: https://blog.logrocket.com/using-typescript-redux-toolkit/

import { IAuth } from "@/entities/IAuth";
import { IUser } from "@/entities/IUser";
import { HttpError } from "@/exceptions/http-error";
import { ISignin } from "@/interfaces/ISignin";
import { ISignup } from "@/interfaces/ISignup";
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
  message: string | null;
}

const accessToken = storageService.getItem("accessToken");

const userJwt: IUserJWT | null = accessToken
  ? jwtService.decode(accessToken)
  : null;

const user: IUser | null = userJwt ? serializeUserJwt(userJwt) : userJwt;

const initialState: AuthState = {
  user,
  status: "idle",
  message: null,
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
    let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

    if (error instanceof HttpError) errorMessage = error.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const signup = createAsyncThunk<
  IUser,
  ISignup,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("auth/signup", async (data, thunkAPI) => {
  try {
    const res = await authService.signup(data);

    return res;
  } catch (error: any) {
    let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

    if (error instanceof HttpError) errorMessage = error.message;

    return thunkAPI.rejectWithValue(errorMessage);
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
    let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

    if (error instanceof HttpError) errorMessage = error.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      authService.logout();
      state.user = null;
    },
    resetMessage(state) {
      state.message = null;
      state.status = "idle";
    },
  },
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
      .addCase(signin.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(signup.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, _) => {
        state.status = "success";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(updateProfile.pending, (state, _) => {
        // state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        // state.status = "success";
      })
      .addCase(updateProfile.rejected, (state, _) => {
        // state.status = "error";
      });
  },
});

export const { logout, resetMessage } = authSlice.actions;
export const authSelector = (state: RootState) => state.authReducer;
export default authSlice.reducer;
