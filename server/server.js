import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dbConnection } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import foodRouter from "./routes/foodRoutes.js";
import delivererRouter from "./routes/delivererRoutes.js";
import statusRouter from "./routes/statusRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import orderStatusRouter from "./routes/orderStatusRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la bdd
mongoose
  .connect(dbConnection.url, dbConnection.options)
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Initialisation des routes
app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/deliverer", delivererRouter);
app.use("/api/status", statusRouter);
app.use("/api/order", orderRouter);
app.use("/api/order_status", orderStatusRouter);

// Lancement du server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at port ${port}`);
});
