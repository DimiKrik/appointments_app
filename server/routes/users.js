import express from "express";
import User from "../models/User.js";
import { updateUser, deleteUser, getUser, getallUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("hello user, you are logged in");
})
router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("hello user, you are logged in and you can delete your account");
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("hello user, you are an admin");
})
//UPDATE
router.put("/:id", updateUser);
//DELETE
router.delete("/:id", deleteUser);
//GET
router.get("/:id", getUser);
//GET ALL
router.get("/",getallUser);

router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params._id;
      const user = await User.findById(userId).select('alphabeta');
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;