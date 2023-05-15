import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
import user from "../models/user.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startwith("Bearer")) {
    token = req.headers.authorization.split("  ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const curUser = await user.findById(decoded.id);

    if (!curUser) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
};

export default protect;
