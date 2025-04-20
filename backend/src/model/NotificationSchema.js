import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    complaintId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Complaint", 
      required: true 
    }, 
    
    message: { 
      type: String, 
      required: true 
    }, 
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
