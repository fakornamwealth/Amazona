import express from "express";
import cors from "cors";
import data from "./data.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import stripeRoute from "./routes/stripe.js";
import orderRoute from "./routes/order.js";
import userRoute from "./routes/user.js";
import cartRoute from "./routes/cart.js";

dotenv.config();
const app = express();

app.use(
  cors({
    allowedHeaders: "*",
  })
);
app.get("/api", (req, res) => {
  res.send("HomePage");
});
app.get("/api/products", (req, res) => {
  console.log("products", data.products);
  res.send(data.products);
});
app.post("/api/products", (req, res) => {
  console.log(req.body);
  console.log("products", data.products);
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found!" });
  }
});
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

app.listen(5001, () => {
  console.log("serve at http://localhost:5001");
});
