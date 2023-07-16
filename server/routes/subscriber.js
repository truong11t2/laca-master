import { Router } from "express";
// Controllers
import { subscribe } from "../controllers/subscribe.js";

const subscriberRouter = Router();

subscriberRouter.route("/email").post(subscribe);

export default subscriberRouter;
