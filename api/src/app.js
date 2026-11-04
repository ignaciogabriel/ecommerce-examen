import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import clientRoutes from "./routes/clientRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Cargar modelos
import "./models/product.js";

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Montar las rutas

app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

export default app;