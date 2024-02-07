import { IUser } from "@/entities/IUser";
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
    return thunkAPI.rejectWithValue(
      error?.message || "Ocorreu algum erro interno no servidor."
    );
  }
});

export const nonFriendsUsersSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNonFriendsUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllNonFriendsUsers.fulfilled, (state, action) => {
        state.nonFriendsUsers = action.payload;
        state.status = "success";
      })
      .addCase(getAllNonFriendsUsers.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const {} = nonFriendsUsersSlice.actions;

export const nonFriendsUsersSelector = (state: RootState) =>
  state.nonFriendsUsersReducer;
export default nonFriendsUsersSlice.reducer;
