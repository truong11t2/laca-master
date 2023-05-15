import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import admin from "../models/admin.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = admin.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

export default protectRoute;
