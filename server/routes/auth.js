import { Router } from "express";
// Controllers
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  refresh,
  logout,
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.route("/register").post(register);

authRouter.route("/login").post(login);

authRouter.route("/refresh").get(refresh);

authRouter.route("/logout").post(logout);

authRouter.route("/forgotpassword").post(forgotPassword);

authRouter.route("/passwordreset/:resetToken").put(resetPassword);

export default authRouter;
