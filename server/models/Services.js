import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    tools:{
        type: String,
        required:true
    },
    price:{
        type: Number
    }
});

export default mongoose.model("Service", ServiceSchema);