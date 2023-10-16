import mongoose from 'mongoose';

const ToolSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  toolName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Tool', ToolSchema);
