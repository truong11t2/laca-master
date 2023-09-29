import { Router } from "express";
// Controllers
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  googleOauthHandler,
  /* Enable this part if use cookie
  refresh,
  logout,
  getToken,
Enable this part if use cookie */
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.route("/register").post(register);

authRouter.route("/login").post(login);

authRouter.route("/forgotpassword").post(forgotPassword);

authRouter.route("/passwordreset/:resetToken").put(resetPassword);

/* Enable this part if use cookie
authRouter.route("/refresh").get(refresh);

authRouter.route("/logout").post(logout);

authRouter.route("/gettoken").get(getToken);
Enable this part if use cookie */

authRouter.route("/google/oauth2").get(googleOauthHandler);

export default authRouter;
