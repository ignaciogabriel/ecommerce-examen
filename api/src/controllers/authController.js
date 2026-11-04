// api/src/controllers/authController.js

import jwt from "jsonwebtoken";
import { generateToken } from "../utils/auth.js";

export const refreshToken = async (
  req,
  res
) => {

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      msg: "Refresh token requerido"
    });
  }

  try {

    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newToken = generateToken({
      id: payload.id,
      type: payload.type,
      rol: payload.rol
    });

    res.json({
      token: newToken
    });

  } catch (error) {

    res.status(403).json({
      msg: "Refresh token inválido"
    });

  }
};

export const logout = async (
  req,
  res
) => {

  res.json({
    msg: "Sesión cerrada"
  });

};