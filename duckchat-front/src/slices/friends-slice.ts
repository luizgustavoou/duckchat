import { IFriendship } from "@/entities/IFriendship";
import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

export interface FriendsState {
  friends: IFriendship[];
}

const initialState: FriendsState = {
  friends: [],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
});

export const {} = friendsSlice.actions;
export const friendsSelector = (state: RootState) => state.friendsReducer;
export default friendsSlice.reducer;
