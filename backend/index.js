import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 3001;
import { createNewOrder } from "./controllers/ordersController/createOrder.js";
import { CONNECT_DATABASE } from "./config/database.js";

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.post("/api/v1/order/create", createNewOrder);

app.listen(PORT, async () => {
  await CONNECT_DATABASE();
  console.log("Server listening on PORT:" + PORT);
});
