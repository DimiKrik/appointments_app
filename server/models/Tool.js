import mongoose from 'mongoose';

const ToolSchema = new mongoose.Schema({
    type:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    price:{
        type: Number
    }
});

export default mongoose.model("Tool", ToolSchema);