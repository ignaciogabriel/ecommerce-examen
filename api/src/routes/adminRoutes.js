import express from "express";
import { adminLogin, adminRegister } from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import { Admin } from "../models/admin.js";

import { Client } from "../models/client.js";
import { Product } from "../models/product.js";

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

  try {

    const usuariosRegistrados =
      await Client.count();

    const productosActivos =
      await Product.count();

    res.json({
      usuariosRegistrados,
      ventasTotales: 0,
      productosActivos
    });

  } catch (error) {

    res.status(500).json({
      msg: error.message
    });

  }
});

export default router;