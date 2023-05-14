import { Router } from "express";
import { getPrivateRoute } from "../controllers/private.js";
import Protect from "../middlewares/auth.js";

const privateRouter = Router();

privateRouter.route("/").get(Protect, getPrivateRoute);

export default privateRouter;
