import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js ";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      address: req.body.address,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      isTechnician: req.body.isTechnician,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"));

    const token = jwt.sign(
      { id: user._id, isTechnician: user.isTechnician, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isTechnician, isAdmin, _id, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "Strict",
      })
      .status(200)
      .json({_id, ...otherDetails });
  } catch (err) {
    next(err);
  }
};