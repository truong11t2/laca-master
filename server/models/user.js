import { randomBytes, createHash } from "crypto";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide name"],
    },
    lastname: {
      type: String,
      require: false,
    },
    email: {
      type: String,
      required: [true, "Please provide email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    picture: {
      type: String,
      required: false,
    },
    roles: {
      type: [String],
      default: ["user"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtAccessToken = function () {
  return jwt.sign(
    { email: this.email, name: this.firstname, roles: this.roles },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
    }
  );
};

UserSchema.methods.getSignedJwtRefreshToken = function () {
  return jwt.sign(
    { email: this.email, name: this.firstname, roles: this.roles },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    }
  );
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const User = model("User", UserSchema);

export default User;
