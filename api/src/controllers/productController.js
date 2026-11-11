// api/src/controllers/productController.js

import { Product } from "../models/product.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 100,
      search = "",
      category,
      sortBy = "createdAt",
      order = "DESC"
    } = req.query;

    const offset = (page - 1) * limit;

    const where = {};

    if (search) {
      where.name = {
        [Op.like]: `%${search}%`
      };
    }

    if (category) {
      where.category = category;
    }

    const { count, rows } =
      await Product.findAndCountAll({
        where,
        limit: Number(limit),
        offset: Number(offset),
        order: [[sortBy, order]]
      });

    res.json({
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / limit),
      products: rows
    });

  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};


export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByPk(
    req.params.id
  );

  if (!product) {
    return res.status(404).json({
      msg: "Producto no encontrado"
    });
  }

  await product.update(req.body);

  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(
    req.params.id
  );

  if (!product) {
    return res.status(404).json({
      msg: "Producto no encontrado"
    });
  }

  await product.destroy();

  res.json({
    msg: "Producto eliminado"
  });
};