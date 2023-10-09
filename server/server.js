import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dbConnection } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import drugRouter from "./routes/drugRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";

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
app.use("/api/patient", patientRouter);
app.use("/api/drug", drugRouter);
app.use("/api/appointment", appointmentRouter);

// Lancement du server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at port ${port}`);
});
