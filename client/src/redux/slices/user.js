import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const parseJWT = (userInfo) => {
  if (userInfo === null) return null;
  let isAdmin = false;
  let isWriter = false;
  const decoded = jwt_decode(userInfo.token);
  if (decoded.exp < (new Date().getTime() + 1) / 1000) {
    //log out
    localStorage.removeItem("userInfo");
    //redirect login page
    return null;
  } else {
    const { email, name, roles } = decoded;
    isAdmin = roles.includes("admin");
    isWriter = roles.includes("writer");
    return { email, name, roles, isAdmin, isWriter, token: userInfo.token };
  }
};

export const initialState = {
  loading: false,
  error: null,
  userInfo: parseJWT(JSON.parse(localStorage.getItem("userInfo"))),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = parseJWT(payload);
      state.error = null;
      state.loading = false;
    },
    userRegister: (state, { payload }) => {
      state.userInfo = parseJWT(payload);
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
