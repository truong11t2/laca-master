import { Router } from "express";
// Controllers
import { login, register, forgotPassword, resetPassword } from "../controllers/auth.js";

const authRouter = Router();

authRouter.route("/register").post(register);

authRouter.route("/login").post(login);

authRouter.route("/forgotpassword").post(forgotPassword);

authRouter.route("/passwordreset/:resetToken").put(resetPassword);

export default authRouter;
