import mongoose from 'mongoose';
import Tool from './Tool.js';
import Service from './Services.js';

const AppointmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  app_date: {
    type: Date,
    required: false,
  },
  pref_time: {
    type: String,
    required: false,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: false,
  },
    tools_id: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Tool',
      required: false,
    },
  technician_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  }
});

export default mongoose.model('Appointment', AppointmentSchema);
