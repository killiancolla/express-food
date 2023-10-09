import express from "express";
import Deliverer from "../controller/delivererController.js";

const delivererRouter = express.Router();

delivererRouter.get("/", Deliverer.getAllDeliverers);
delivererRouter.get("/:id", Deliverer.getDelivererById);
delivererRouter.get("/user/:id", Deliverer.getDelivererByUserId);
delivererRouter.post("/add", Deliverer.addDeliverer);
delivererRouter.patch("/:id", Deliverer.updateDelivererStatus);
delivererRouter.patch("/:id", Deliverer.updateDelivererPosition);
delivererRouter.delete("/delete", Deliverer.deleteDeliverer);

export default delivererRouter;
