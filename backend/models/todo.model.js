import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    },

  completed: {
    type: Boolean,
    default: false,
    },
  
    priority: {   
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
    duedate: {
      type: Date,
      default: null,
  },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
  },

}, {  timestamps: true,});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;