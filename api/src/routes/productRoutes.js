// api/src/routes/productRoutes.js

import express from "express";

import { Product } from "../models/product.js";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


router.post("/seed-products", async (req, res) => {

  await Product.bulkCreate([

    {
      name: "Notebook Lenovo IdeaPad",
      description: "Notebook 15 pulgadas",
      price: 1200,
      stock: 10,
      category: "Notebooks",
      imageUrl: "https://picsum.photos/seed/lenovo/600/400"
    },

    {
      name: "Notebook HP Pavilion",
      description: "Intel i7",
      price: 1450,
      stock: 8,
      category: "Notebooks",
      imageUrl: "https://picsum.photos/seed/hp/600/400"
    },

    {
      name: "MacBook Air M2",
      description: "Apple Silicon",
      price: 2200,
      stock: 5,
      category: "Notebooks",
      imageUrl: "https://picsum.photos/seed/macbook/600/400"
    },

    {
      name: "Mouse Logitech G203",
      description: "Mouse gamer RGB",
      price: 45,
      stock: 30,
      category: "Periféricos",
      imageUrl: "https://picsum.photos/seed/logitech/600/400"
    },

    {
      name: "Mouse Redragon Cobra",
      description: "Mouse gamer",
      price: 55,
      stock: 20,
      category: "Periféricos",
      imageUrl: "https://picsum.photos/seed/redragon/600/400"
    },

    {
      name: "Teclado Redragon Kumara",
      description: "Mecánico",
      price: 80,
      stock: 15,
      category: "Periféricos",
      imageUrl: "https://picsum.photos/seed/kumara/600/400"
    },

    {
      name: "Teclado HyperX Alloy",
      description: "Gaming RGB",
      price: 120,
      stock: 12,
      category: "Periféricos",
      imageUrl: "https://picsum.photos/seed/hyperx/600/400"
    },

    {
      name: "Monitor Samsung 24",
      description: "Full HD",
      price: 280,
      stock: 8,
      category: "Monitores",
      imageUrl: "https://picsum.photos/seed/samsung/600/400"
    },

    {
      name: "Monitor LG Ultrawide",
      description: "34 pulgadas",
      price: 650,
      stock: 6,
      category: "Monitores",
      imageUrl: "https://picsum.photos/seed/lg/600/400"
    },

    {
      name: "Monitor Asus ProArt",
      description: "Diseño profesional",
      price: 790,
      stock: 4,
      category: "Monitores",
      imageUrl: "https://picsum.photos/seed/proart/600/400"
    },

    {
      name: "Auriculares HyperX Cloud",
      description: "Gaming",
      price: 90,
      stock: 18,
      category: "Audio",
      imageUrl: "https://picsum.photos/seed/cloud/600/400"
    },

    {
      name: "Auriculares Sony WH1000XM5",
      description: "Noise Cancelling",
      price: 420,
      stock: 7,
      category: "Audio",
      imageUrl: "https://picsum.photos/seed/sony/600/400"
    },

    {
      name: "Parlante JBL Flip",
      description: "Bluetooth",
      price: 130,
      stock: 10,
      category: "Audio",
      imageUrl: "https://picsum.photos/seed/jbl/600/400"
    },

    {
      name: "Webcam Logitech C920",
      description: "Full HD",
      price: 95,
      stock: 14,
      category: "Periféricos",
      imageUrl: "https://picsum.photos/seed/c920/600/400"
    },

    {
      name: "Dock Station Dell",
      description: "USB-C",
      price: 160,
      stock: 9,
      category: "Periféricos",
      imageUrl: "https://picsum.photos/seed/dell/600/400"
    }

  ]);

  res.json({
    msg: "Productos creados"
  });

});


export default router;