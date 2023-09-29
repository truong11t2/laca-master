import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
/* Enable this part if use cookie 
import { reIssueAccessToken, refresh } from "../controllers/auth.js";
import { accessTokenCookieOptions } from "../controllers/auth.js";
import { refreshTokenCookieOptions } from "../controllers/auth.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  const cookie = req.headers.cookie;

  if (cookie) {
    try {
      const cookies = cookie.split(";");
      if (cookies[0].includes("laca-accessToken")) {
        var accessToken = cookies[0].split("=")[1];
        var refreshToken = cookies[1].split("=")[1];
      } else {
        var refreshToken = cookies[0].split("=")[1];
        var accessToken = cookies[1].split("=")[1];
      }
      //const refreshToken = cookies[0].split("=")[1];
      if (!refreshToken) {
        return next(
          new ErrorResponse("Not authorized to access this route", 401)
        );
      }
      const decodedAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      if (decodedAccessToken) {
        next();
      }
      //Access token is expired
      else {
        res.cookie(
          "laca-refreshToken",
          refreshToken,
          refreshTokenCookieOptions
        );
        const accessToken = await reIssueAccessToken(refreshToken);
        res.cookie("laca-accessToken", accessToken, accessTokenCookieOptions);
        // Send token back to client
        //res.status(200).json({ accessToken });
        next();
      }
    } catch (error) {
      return next(
        new ErrorResponse("Not authorized to access this router", 401)
      );
    }
  }
});

Enable this part if use cookie */

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
      req.user = User.find(decoded.email);

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
