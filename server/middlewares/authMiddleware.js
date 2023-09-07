import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";
import { reIssueAccessToken, refresh } from "../controllers/auth.js";
import { accessTokenCookieOptions } from "../controllers/auth.js";
import { refreshTokenCookieOptions } from "../controllers/auth.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  const cookie = req.headers.cookie;

  if (cookie) {
    try {
      const cookies = cookie.split(";");
      const refreshToken = cookies[0].split("=")[1];
      if (!refreshToken) {
        return next(
          new ErrorResponse("Not authorized to access this route", 401)
        );
      }
      if (cookies[1]) {
        const accessToken = cookies[1].split("=")[1];
        const decodedAccessToken = jwt.verify(
          accessToken,
          process.env.JWT_ACCESS_TOKEN_SECRET
        );
        if (decodedAccessToken) {
          next();
        }
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

export default protectRoute;
