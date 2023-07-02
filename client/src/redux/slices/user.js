import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const parseJWT = () => {
  let user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) {
    let decode = jwt_decode(user.token);
    if (decode.exp < (new Date().getTime() + 1) / 1000) {
      //log out
      localStorage.removeItem("userInfo");
      //redirect login page
      return null;
    }
  }
  return user;
};

export const initialState = {
  loading: false,
  error: null,
  userInfo: parseJWT(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userRegister: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setError, setLoading, userLogin, userRegister, userLogout } = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state) => state.user;
