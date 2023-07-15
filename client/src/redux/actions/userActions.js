import axios from "axios";
import { setLoading, setError, userLogin, userRegister, userLogout } from "../slices/user";

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //const { data } = await axios.post("/api/admin/login", { email, password }, config); //for admin login
    const { data } = await axios.post("/api/auth/login", { email, password }, config); //for user login
    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const register = (firstname, lastname, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/auth/register", { firstname, lastname, email, password }, config);
    dispatch(userRegister(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const forgotPassword = (email) => async(dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("/api/auth/forgotpassword", {email}, config);
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

export const resetPassword = (password, token) => async(dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put("/api/auth/passwordreset/" + token, {password}, config);
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
}
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};
