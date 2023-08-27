import mongoose from 'mongoose';
import Tool from "./Tool.js";
import Service from "./Services.js";

const AppointmentSchema = new mongoose.Schema({
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    app_date:{
        type: Date,
        required:false
    },
    service_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Service',
        required:true
    },
    tools_id:{
        type: [mongoose.Schema.Types.ObjectId], ref: 'Tool',
        required:false
    },
    technician_id:{
        type: String,
        required:false
    },
    price:{
        type: Number
    },
    totalCost:{
        type: Number,
    }
});

export default mongoose.model("Appointment", AppointmentSchema);