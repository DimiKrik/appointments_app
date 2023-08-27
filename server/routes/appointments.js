import express from "express";
import { createAppointment, updateAppointment, deleteAppointment,getAppointment, getallAppointment } from "../controllers/appointment.js";

const router = express.Router();

router.post("/", createAppointment);

//UPDATE
router.put("/:id", updateAppointment);
//DELETE
router.delete("/:id", deleteAppointment);
//GET
router.get("/:id", getAppointment);

//GET ALL
router.get("/",getallAppointment);

export default router;