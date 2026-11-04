//api/src/utils/auth.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

export const comparePassword = async (
  plainPassword,
  hashedPassword
) => {
  return await bcrypt.compare(
    plainPassword,
    hashedPassword
  );
};

// ACCESS TOKEN
export const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: "15m"
    }
  );
};

// REFRESH TOKEN
export const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d"
    }
  );
};