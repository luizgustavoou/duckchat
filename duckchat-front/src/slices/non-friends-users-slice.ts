import { IUser } from "@/entities/IUser";
import { HttpError } from "@/exceptions/http-error";
import { IGetNonFriendsUsersBySearch } from "@/interfaces/IGetNonFriendsUsersBySearch";
import { userService } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface NonFriendsState {
  nonFriendsUsers: IUser[];
  status: "idle" | "loading" | "success" | "error";
}

const initialState: NonFriendsState = {
  nonFriendsUsers: [],
  status: "idle",
};

export const getAllNonFriendsUsers = createAsyncThunk<
  IUser[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("nonfriendsusers/getall", async (_, thunkAPI) => {
  try {
    const res = await userService.getAllNonFriendsUsers();

    return res;
  } catch (error: any) {
    let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

    if (error instanceof HttpError) errorMessage = error.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const getNonFriendsUsersBySearch = createAsyncThunk<
  IUser[],
  IGetNonFriendsUsersBySearch,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("nonfriendsusers/search", async (data, thunkAPI) => {
  try {
    const res = await userService.getNonFriendsUsersBySearch(data);

    return res;
  } catch (error: any) {
    let errorMessage = "Ocorreu algum erro. Por favor, tente mais tarde.";

    if (error instanceof HttpError) errorMessage = error.message;

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const nonFriendsUsersSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNonFriendsUsers.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(getAllNonFriendsUsers.fulfilled, (state, action) => {
        state.nonFriendsUsers = action.payload;
        state.status = "success";
      })
      .addCase(getAllNonFriendsUsers.rejected, (state, _) => {
        state.status = "error";
      })
      .addCase(getNonFriendsUsersBySearch.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(getNonFriendsUsersBySearch.fulfilled, (state, action) => {
        state.nonFriendsUsers = action.payload;
        state.status = "success";
      })
      .addCase(getNonFriendsUsersBySearch.rejected, (state, _) => {
        state.status = "error";
      });
  },
});

export const {} = nonFriendsUsersSlice.actions;

export const nonFriendsUsersSelector = (state: RootState) =>
  state.nonFriendsUsersReducer;
export default nonFriendsUsersSlice.reducer;
