import { createHash } from "crypto";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

// @desc Login user
// @route POST /api/login
// @access Public - for everybody can login
export async function login(req, res, next) {
  const { email, password } = req.body;
  console.log(typeof email);

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Send accessToken containing username and roles
    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
}

// @desc Refresh
// @route GET /api/auth/refresh
// @access Public - because access token has expired
export async function refresh(req, res, next) {
  const cookie = req.headers.cookie;

  if (!cookie)
    return next(new ErrorResponse("Not authorized to access this route", 401));

  const refreshToken = cookie.split("=")[1];
  if (!refreshToken) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    const { email } = decoded;
    const user = await User.findOne({ email });

    // Send accessToken containing username and roles
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
export async function logout(req, res, next) {
  const cookie = req.headers.cookie;

  if (!cookie) return next(new ErrorResponse("No content", 204));

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
}

// @desc Register user
// @route POST /api/auth/register
// @access Public - for everybody can register
export async function register(req, res, next) {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
}

// @desc Forgot Password Initialization
// @route POST /api/auth/forgotpassword
// @access Public - for everybody can get create new password
export async function forgotPassword(req, res, next) {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please follow the below link to create a new one:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
}

// @desc Reset User Password
// @route PUT /api/passwordreset/:resetToken
// @access Public - for everybody can get create new password
export async function resetPassword(req, res, next) {
  // Compare token in URL params to hashed token
  const resetPasswordToken = createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtAccessToken(),
    });
  } catch (err) {
    next(err);
  }
}

const sendToken = (user, statusCode, res) => {
  // Create secure cookie with refresh token
  res.cookie("jwt", user.getSignedJwtRefreshToken(), {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  const token = user.getSignedJwtAccessToken();
  res.status(statusCode).json({ token });
};
