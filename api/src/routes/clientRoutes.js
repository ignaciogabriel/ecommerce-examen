import express from "express";
import { clientLogin, clientRegister } from "../controllers/clientController.js";
import { verifyToken, isClient } from "../middlewares/auth.js";
import { Client } from "../models/client.js";

const router = express.Router();

router.post("/login", clientLogin);
router.post("/register", clientRegister);

router.get("/perfil", verifyToken, isClient, async (req, res) => {
  const client = await Client.findByPk(req.user.id, {
    attributes: ["id", "nombre", "email", "direccion", "telefono"]
  });
  res.json(client);
});

export default router;