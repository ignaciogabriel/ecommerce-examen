import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};