import express from "express";
import { adminLogin, adminRegister } from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import { Admin } from "../models/admin.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/register", adminRegister);

router.get("/perfil", verifyToken, isAdmin, async (req, res) => {
  const admin = await Admin.findByPk(req.user.id, {
    attributes: ["id", "nombre", "email", "rol"]
  });
  res.json(admin);
});

router.get("/metricas", verifyToken, isAdmin, async (req, res) => {
  res.json({ ventas: 100, usuarios: 50 }); // ejemplo
});

export default router;