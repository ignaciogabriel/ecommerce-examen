import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ msg: "Token requerido" });

  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

export const isClient = (req, res, next) => {
  if (req.user.type !== "client") return res.status(403).json({ msg: "Acceso denegado" });
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.type !== "admin") return res.status(403).json({ msg: "Acceso denegado" });
  next();
};