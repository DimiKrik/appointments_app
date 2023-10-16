import express from "express";
import User from "../models/User.js";
import { updateUser, deleteUser, getUser, getallUser, getClients, getTechnicians} from "../controllers/user.js";

const router = express.Router();

router.put("/:id", updateUser);


router.delete("/:id", deleteUser);

router.get("/:id", getUser);


// Get all isClient = ture
router.get("/getClients/clients/", getClients);
// Get all isTechician = true
router.get("/getTechnician/technicians/", getTechnicians);

//GET ALL
router.get("/",getallUser);


export default router;