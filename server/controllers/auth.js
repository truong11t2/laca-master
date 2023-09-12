import { createHash } from "crypto";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
dotenv.config();

export const accessTokenCookieOptions = {
  maxAge: process.env.ACCESS_TOKEN_COOKIE_MAX_AGE, // 15 mins
  httpOnly: true,
  domain: "laca.fun",
  path: "/",
  sameSite: "lax",
  secure: false,
};

export const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: process.env.REFRESH_TOKEN_COOKIE_MAX_AGE, // 1 year
};

// @desc Login user
// @route POST /api/login
// @access Public - for everybody can login
export async function login(req, res, next) {
  const { email, password } = req.body;

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

    // Create access token
    res.cookie(
      "laca-accessToken",
      user.getSignedJwtAccessToken(),
      accessTokenCookieOptions
    );

    // Create refresh token
    res.cookie(
      "laca-refreshToken",
      user.getSignedJwtRefreshToken(),
      refreshTokenCookieOptions
    );

    // Send token back to client
    const token = user.getSignedJwtToken();
    res.status(200).json({ token });
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

    // Create access token
    res.cookie(
      "laca-accessToken",
      user.getSignedJwtAccessToken(),
      accessTokenCookieOptions
    );

    // Redirect to login page on client
    res.status(200).send("New access token has been sent in cookie");
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

  res.clearCookie("laca-accessToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.clearCookie("laca-refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
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

    // Create access token
    res.cookie(
      "laca-accessToken",
      user.getSignedJwtAccessToken(),
      accessTokenCookieOptions
    );

    // Create refresh token
    res.cookie(
      "laca-refreshToken",
      user.getSignedJwtRefreshToken(),
      refreshTokenCookieOptions
    );

    // Send token back to client
    const token = user.getSignedJwtToken();
    res.status(200).json({ token });
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
    //const resetUrl = `http://localhost:5000/passwordreset/${resetToken}`;
    const resetUrl = `https://laca.fun/passwordreset/${resetToken}`;

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

export async function getToken(req, res, next) {
  const cookie = req.headers.cookie;
  const cookies = cookie.split(";");
  if (cookies[0].includes("laca-accessToken")) {
    var accessToken = cookies[0].split("=")[1];
  } else {
    var accessToken = cookies[1].split("=")[1];
  }
  //console.log(accessToken);

  // For a valid access token
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );

    if (decoded) {
      const { email } = decoded;
      const user = await User.findOne({ email });
      let token = user.getSignedJwtToken();
      res.status(200).json({ token });
    }
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
}
export async function googleOauthHandler(req, res) {
  // get the code from qs
  const code = req.query.code;
  //console.log(code);

  try {
    // get the id and access token with the code
    const { access_token, id_token, refresh_token } =
      await getGoogleOAuthTokens({
        code,
      });
    console.log({ access_token, id_token, refresh_token });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });
    jwt.decode(id_token);

    console.log({ googleUser });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    // upsert the user
    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        firstname: googleUser.given_name,
        lastname: googleUser.family_name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );

    // Create access token
    res.cookie(
      "laca-accessToken",
      user.getSignedJwtAccessToken(),
      accessTokenCookieOptions
    );

    // Create refresh token
    res.cookie(
      "laca-refreshToken",
      user.getSignedJwtRefreshToken(),
      refreshTokenCookieOptions
    );

    // Redirect back to client
    res.redirect(`${process.env.ORIGIN}/login-success`);
  } catch (error) {
    console.log("Failed to authorize Google user");
    //todo: create oauth error page on front end
    return res.redirect(`${process.env.ORIGIN}/oauth/error`);
  }
}

const getGoogleOAuthTokens = async ({ code }) => {
  const url = "https://accounts.google.com/o/oauth2/token";
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    grant_type: "authorization_code",
  };
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // Send request to get tokens
  try {
    const res = await axios.post(url, qs.stringify(values), config);
    return res.data;
  } catch (error) {
    return new ErrorResponse("Bad request", 400);
  }
};

const getGoogleUser = async ({ access_token, id_token }) => {
  try {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
    const config = {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    };
    const res = await axios.get(url, config);
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching Google user");
    return new ErrorResponse("Error fetching Google user", 400);
  }
};

const findAndUpdateUser = async (query, update, options) => {
  return User.findOneAndUpdate(query, update, options);
};

export async function reIssueAccessToken(refreshToken) {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    const { email } = decoded;
    const user = await User.findOne({ email });

    // Create access token
    const token = user.getSignedJwtAccessToken();
    return token;
  } catch (error) {
    return next(
      new ErrorResponse("Something went wrong. Try to login again", 500)
    );
  }
}
