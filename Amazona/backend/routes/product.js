import express from "express";
import Product from "../models/Product.js";

import { verifyTokenAndAdmin } from "./verifyToken.js";

const router = express.Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).send(savedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let product;

    if (qNew) {
      product = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      product = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      product = await Product.find();
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
