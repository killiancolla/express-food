import express from "express";
import Status from "../controller/statusController.js";

const statusRouter = express.Router();

statusRouter.get("/", Status.getAllStatus);
statusRouter.get("/:id", Status.getStatusById);
statusRouter.post("/add", Status.addStatus);
statusRouter.patch("/:id", Status.updateStatus);
statusRouter.delete("/delete", Status.deleteStatus);

export default statusRouter;
