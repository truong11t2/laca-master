import { Router } from "express";
import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const adminRouter = Router();

//TODO: redefine expiresIn
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: genToken(user._id),
    });
  } else {
    res.status(401).send("Invalid Email or Password");
  }
});

adminRouter.route("/login").post(loginUser);

export default adminRouter;
