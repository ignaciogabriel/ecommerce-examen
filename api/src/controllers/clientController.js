import { Client } from "../models/client.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";

export const clientLogin = async (req, res) => {
  const { email, password } = req.body;
  const client = await Client.findOne({ where: { email } });
  if (!client) return res.status(404).json({ msg: "Cliente no encontrado" });

  const valid = await comparePassword(password, client.password);
  if (!valid) return res.status(401).json({ msg: "Credenciales inválidas" });

  const token = generateToken({ id: client.id, type: "client" });
  res.json({ token });
};

export const clientRegister = async (req, res) => {
  const { email, password, nombre, direccion, telefono } = req.body;
  if (!nombre) return res.status(400).json({ msg: "El nombre es obligatorio" });

  const hashed = await hashPassword(password);
  const client = await Client.create({ email, password: hashed, nombre, direccion, telefono });
  res.json({ msg: "Cliente creado", client });
};