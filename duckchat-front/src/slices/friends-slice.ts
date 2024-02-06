import { IFriendship } from "@/entities/IFriendship";
import { userService } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface FriendsState {
  friends: IFriendship[];
  status: "idle" | "loading" | "success" | "error";
}

const initialState: FriendsState = {
  friends: [],
  status: "idle",
};

const getAllFriendsOfUser = createAsyncThunk<
  IFriendship[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("friends/getall", async (_, thunkAPI) => {
  try {
    const res = await userService.getAllFriendsOfUser();

    return res;
  } catch (error) {
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
      .addCase(getAllFriendsOfUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllFriendsOfUser.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.status = "success";
      })
      .addCase(getAllFriendsOfUser.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const {} = friendsSlice.actions;
export const friendsSelector = (state: RootState) => state.friendsReducer;
export default friendsSlice.reducer;
