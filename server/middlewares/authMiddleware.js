import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(
          new ErrorResponse("Not authorized to access this route", 401)
        );
      }
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
      req.user = User.find(decoded.email);

      next();
    } catch (error) {
      return next(
        new ErrorResponse("Not authorized to access this router", 401)
      );
    }
  }
});

export default protectRoute;
