import express from "express";
import Deliverer from "../controller/delivererController.js";
import { isAdmin, isAuth } from "../auth/authentification.js";

const delivererRouter = express.Router();

delivererRouter.get("/", Deliverer.getAllDeliverers);
delivererRouter.get("/:id", Deliverer.getDelivererById);
delivererRouter.get("/user/:id", Deliverer.getDelivererByUserId);
delivererRouter.post("/add", isAuth, isAdmin, Deliverer.addDeliverer);
delivererRouter.patch("/:id", isAuth, Deliverer.updateDelivererStatus);
delivererRouter.delete("/delete", isAuth, isAdmin, Deliverer.deleteDeliverer);

export default delivererRouter;
