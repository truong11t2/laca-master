import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/admin.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = Admin.findById(decoded.id);

      next();
    } catch (error) {
      return next(new ErrorResponse("Not authorized to access this router", 401));
    }
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

export default protectRoute;
