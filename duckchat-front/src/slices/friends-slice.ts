import { IFriendship } from "@/entities/IFriendship";
import { IAddFriend } from "@/interfaces/IAddFriend";
import { userService } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRemoveFriend } from "@/interfaces/IRemoveFriend";

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

    // await thunkAPI.dispatch(getAllNonFriends());

    return res;
  } catch (error: any) {
    console.log(error);
    return thunkAPI.rejectWithValue(
      error?.message || "Ocorreu algum erro interno no servidor."
    );
  }
});

export const removeFriend = createAsyncThunk<
  Pick<IFriendship, "id">,
  IRemoveFriend,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("friends/remove", async (data, thunkAPI) => {
  try {
    const res = await userService.removeFriend(data);

    // await thunkAPI.dispatch(getAllFriendsOfUser());

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
      .addCase(getAllFriendsOfUser.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(getAllFriendsOfUser.fulfilled, (state, action) => {
        state.friendships = action.payload;
        state.status = "success";
      })
      .addCase(getAllFriendsOfUser.rejected, (state, _) => {
        state.status = "error";
      })
      .addCase(addFriend.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.friendships.push(action.payload);
        state.status = "success";
      })
      .addCase(addFriend.rejected, (state, _) => {
        state.status = "error";
      })
      .addCase(removeFriend.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.friendships = state.friendships.filter((friendship) => {
          return friendship.id !== action.payload.id;
        });

        state.status = "success";
      })
      .addCase(removeFriend.rejected, (state, _) => {
        state.status = "error";
      });
  },
});

export const {} = friendsSlice.actions;

export const friendsSelector = (state: RootState) => state.friendsReducer;
export default friendsSlice.reducer;
