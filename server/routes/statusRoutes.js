import express from "express";
import Status from "../controller/statusController.js";
import { isAdmin, isAuth } from "../auth/authentification.js";

const statusRouter = express.Router();

statusRouter.get("/", Status.getAllStatus);
statusRouter.get("/:id", Status.getStatusById);
statusRouter.post("/add", isAuth, isAdmin, Status.addStatus);
statusRouter.patch("/:id", isAuth, isAdmin, Status.updateStatus);
statusRouter.delete("/delete", isAuth, isAdmin, Status.deleteStatus);

export default statusRouter;
