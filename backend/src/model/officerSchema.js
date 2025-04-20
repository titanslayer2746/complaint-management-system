import mongoose from "mongoose";

const OfficerSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    badgeId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        enum: [
            "Municipal Officer",
            "Sanitation Officer",
            "Water Department Officer",
            "Electricity Department Officer",
            "Traffic Police",
            "Police Officer",
            "HR Officer",
            "Legal Officer",
            "Anti-Corruption Officer",
            "Consumer Rights Officer",
            "Telecom Officer",
          ],
    }, 
    assignedTasks: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Complaint" 
    }],
  },
  { timestamps: true }
);

const Officer = mongoose.model("Officer", OfficerSchema);
export default Officer;
