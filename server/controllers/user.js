import User from '../models/User.js';
import bcrypt from "bcryptjs";


export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      const { password, ...userUpdate } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      userUpdate.password = hashedPassword;
      
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: userUpdate },
        { new: true }
      );
      
      res.status(200).json(updatedUser);
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    next(err);
  }
};




export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
    console.log('user deleted');
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getallUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getClients = async (req, res, next) => {
  try {
    const user = await User.find({
      $and: [{ isClient: true }, { isTechnician: false }, { isAdmin: false }],
    }).sort({ username: 1 });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getTechnicians = async (req, res, next) => {
  try {
    const user = await User.find({ isTechnician: true }).sort({ username: 1 });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
