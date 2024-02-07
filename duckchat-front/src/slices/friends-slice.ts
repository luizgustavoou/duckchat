import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "@/interfaces/IAddFriend";
import { userService } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface FriendsState {
  friendships: IFriendship[];
  status: "idle" | "loading" | "success" | "error";
}

const initialState: FriendsState = {
  friendships: [],
  status: "idle",
};

export const addFriend = createAsyncThunk<
  IFriendship,
  IAddFriend,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("friends/add", async (data, thunkAPI) => {
  try {
    const res = await userService.addFriend(data);

    return res;
  } catch (error: any) {
    console.log(error);
    return thunkAPI.rejectWithValue(
      error?.message || "Ocorreu algum erro interno no servidor."
    );
  }
});

export const getAllFriendsOfUser = createAsyncThunk<
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
      .addCase(getAllFriendsOfUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllFriendsOfUser.fulfilled, (state, action) => {
        state.friendships = action.payload;
        state.status = "success";
      })
      .addCase(getAllFriendsOfUser.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(addFriend.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.friendships.push(action.payload);
        state.status = "success";
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const {} = friendsSlice.actions;
export const friendsSelector = (state: RootState) => state.friendsReducer;
export default friendsSlice.reducer;
