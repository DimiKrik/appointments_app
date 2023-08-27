import express from "express";
import { createService, deleteService, getService, getallService, updateService } from "../controllers/service.js";
import { verifyAdmin, verifyUser, verifyTechnician } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createService);

//UPDATE
router.put("/:id", updateService);
//DELETE
router.delete("/:id", deleteService);
//GET
router.get("/:id", getService);
//GET ALL
router.get("/", verifyTechnician, getallService);

export default router;
