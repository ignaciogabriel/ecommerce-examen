import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import clientRoutes from "./routes/clientRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Montar las rutas

app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);

export default app;