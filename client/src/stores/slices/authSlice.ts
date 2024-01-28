import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../interfaces/User";

const auth: User = {
  accessToken: null,
  user: null,
  roles: null,
  id: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: auth,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, id } = action.payload;

      if (user) {
        state.user = user;
      }
      if (accessToken) {
        state.accessToken = accessToken;
      }
      if (id) {
        state.id = id;
      }
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.roles = null;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;
