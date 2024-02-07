import { IUser } from "@/entities/IUser";
import { userService } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface NonFriendsState {
  nonFriends: IUser[];
  status: "idle" | "loading" | "success" | "error";
}

const initialState: NonFriendsState = {
  nonFriends: [],
  status: "idle",
};

export const getAllNonFriends = createAsyncThunk<
  IUser[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("nonfreinds/getall", async (_, thunkAPI) => {
  try {
    const res = await userService.getAllNonFriendsUsers();

    return res;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.message || "Ocorreu algum erro interno no servidor."
    );
  }
});

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNonFriends.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllNonFriends.fulfilled, (state, action) => {
        state.nonFriends = action.payload;
        state.status = "success";
      })
      .addCase(getAllNonFriends.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const {} = friendsSlice.actions;

export const nonFriendsSelector = (state: RootState) => state.nonFriendsReducer;
export default friendsSlice.reducer;
