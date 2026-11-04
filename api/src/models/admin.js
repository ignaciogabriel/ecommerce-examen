import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
//enum es una lissta cerrada que admite solo superadmin, editor y viewer
  rol: {
    type: DataTypes.ENUM(
      "superadmin",
      "editor",
      "viewer"
    ),
    defaultValue: "viewer",
    allowNull: false
  }
});