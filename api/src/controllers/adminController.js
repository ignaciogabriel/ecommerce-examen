import { Admin } from "../models/admin.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";


//login de administrador
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) return res.status(404).json({ msg: "Admin no encontrado" });

  const valid = await comparePassword(password, admin.password);
  if (!valid) return res.status(401).json({ msg: "Credenciales inválidas" });

  const token = generateToken({ id: admin.id, type: "admin", rol: admin.rol });
  res.json({ 
    token,
    admin: {
    id: admin.id,
    nombre: admin.nombre,
    email: admin.email,
    rol: admin.rol
  }
   });
};


//registrar un administrador por rol
export const adminRegister = async (req, res) => {
  const {
    email,
    password,
    nombre,
    rol
  } = req.body;

  if (!nombre) {
    return res.status(400).json({
      msg: "El nombre es obligatorio"
    });
  }

  const hashed = await hashPassword(password);

  const admin = await Admin.create({
    email,
    password: hashed,
    nombre,
    rol
  });

  res.json({
    msg: "Admin creado",
    admin
  });
};