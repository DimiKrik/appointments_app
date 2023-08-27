import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createTool, deleteTool, getTool, getallTool, updateTool } from "../controllers/tool.js";

const router = express.Router();

//CREATE
router.post("/", createTool);

//UPDATE
router.put("/:id", updateTool);
//DELETE
router.delete("/:id", deleteTool);
//GET
router.get("/:id", getTool);
//GET ALL
router.get("/",getallTool);

export default router;
