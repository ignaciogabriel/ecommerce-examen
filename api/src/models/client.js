import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Client = sequelize.define("Client", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  direccion: DataTypes.STRING,
  telefono: DataTypes.STRING,
});