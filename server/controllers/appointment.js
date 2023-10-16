import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { createError } from '../utils/error.js';
import Tool from '../models/Tool.js';
import Services from '../models/Services.js';


export const createAppointment = async (req, res, next) => {

  const newAppointment = new Appointment(req.body);

  try {
    const savedAppointment = await newAppointment.save();
    res.status(200).json(savedAppointment);
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const { status, tools, service_id, totalPrice, technician_id, pref_time, app_date } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }


    if (status !== undefined && status !== null) {
      appointment.status = status;
    }

    if (pref_time) {
      appointment.pref_time = pref_time;
    }

    if (app_date) {
      appointment.app_date = app_date;
    }

    if (totalPrice !== undefined) {
      appointment.totalPrice = totalPrice;
    }

    if (service_id) {
      const fetchedServices = await Services.findById(service_id);
      appointment.service_id = fetchedServices;
    }

    if (technician_id) {
      appointment.technician_id = technician_id;
    }

    if (tools && tools.length > 0) {
      appointment.tools = tools.map((toolId) => ({ toolId, quantity: 1 }));
    }

    const updatedAppointment = await appointment.save();

    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error('Error updating appointment:', err);
    next(err);
  }
};



export const deleteAppointment = async (req, res, next) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json('Appointment has been deleted');
    console.log('Appointment has been deleted');
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

export const getAppByUserId = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const technician_id = req.params.user_id;

    const appointments = await Appointment.find({$or: [{ user_id }, { technician_id }], status:true}).populate(
      'technician_id'
    ).populate('service_id');
    const modifiedAppointments = appointments.map((appointment) => ({
      ...appointment,
      technician_id: appointment.technician_id || "Awaiting",
      app_date: appointment.app_date,
      pref_time: appointment.pref_time,
      service_id:appointment.service_id || "",
      totalPrice: appointment.totalPrice || "-",
    }));
    res.status(200).json(modifiedAppointments);
  } catch (err) {
    next(err);
  }
};

export const getallAppointmentbyUserId = async (req, res, next) => {
  try {
    const user_id= req.params.user_id;
    const technician_id = req.params.user_id;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let appointments;
    if (user.isTechnician) {
      appointments = await Appointment.find({$or: [{ user_id }, { technician_id }],})
        .populate({
          path: 'user_id',
          select: '-password',
        })
        .populate({
          path: 'technician_id',
          select: '-password'})
        .populate('service_id');
    } else {
      appointments = await Appointment.find({ user_id })
      .populate({
        path: 'user_id',
        select: '-password',
      })
      .populate({
        path: 'technician_id',
        select: '-password'})
        .populate('service_id');
    }

    const populatedAppointments = appointments.map((appointment) => {
      const technicianFirstName = appointment.technician_id
        ? appointment.technician_id.firstName
        : 'Awaiting';
      
        const status = appointment.status ? 'On Going' : 'Finished';

      return {
        ...appointment.toObject(),
        technicianFirstName,
        status,
      };
    });

    const sortedAppointments = populatedAppointments.sort((a, b) => {
      const statusComparison = b.status.localeCompare(a.status);

      if (statusComparison !== 0) {
        return statusComparison;
      }

      return new Date(b.app_date) - new Date(a.app_date);
    });

    res.status(200).json(populatedAppointments);
  } catch (err) {
    next(err);
  }
};
export const getallAppointmentsAdmin = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({})
      .populate('user_id')
      .populate('technician_id')
      .populate('service_id');

    const populatedAppointments = appointments.map((appointment) => {
      const technicianFirstName = appointment.technician_id
        ? appointment.technician_id.firstName
        : 'Awaiting';


        
        const status = appointment.status ? 'On Going' : 'Finished';
        
        return {
          ...appointment.toObject(),
          technicianFirstName,
          status,
        };
      });

  
            const sortedAppointments = populatedAppointments.sort((a, b) => {
              const statusComparison = b.status.localeCompare(a.status);
        
              if (statusComparison !== 0) {
                return statusComparison;
              }
        
              return new Date(b.app_date) - new Date(a.app_date);
            });
        

    res.status(200).json(populatedAppointments);
  } catch (err) {
    next(err);
  }
};
