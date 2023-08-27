import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

//export const createAppointment = async (req, res, next) => {
//    const userId = req.params.userid;
//
//    console.log(userId);
//
//    const newAppointment = new Appointment(req.body);
//  
//    try {
//      const savedAppointment = await newAppointment.save();
//      try {
//        await User.findByIdAndUpdate(userId, {
//            $push: { appointment: savedAppointment._id},
//        });
//      } catch (err) {
//        next(err);
//      }
//      res.status(200).json(savedAppointment);
//    } catch (err) {
//      next(err);
//    }
//  };
  export const createAppointment = async (req, res, next) => {
    const newAppointment = new Appointment(req.body);
  
    try {
      const savedAppointment = await newAppointment.save();
//      updateTotalCost()
//  .then(() => {
//    console.log('Total cost updated in Appointments.');
//    mongoose.connection.close(); // Close the MongoDB connection when done
//  })
//  .catch(error => {
//    console.error('Error:', error);
//    mongoose.connection.close(); // Close the MongoDB connection in case of error
//  });
      res.status(200).json(savedAppointment);
    } catch (err) {
      next(err);
    }
  };

export const updateAppointment = async (req, res, next) => {
  try {
    const updatedAppointment = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Appointment has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};

export const getallAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.find();
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};
