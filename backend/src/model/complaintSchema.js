import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        enum: [
            "Road Damage",
            "Water Leakage",
            "Garbage Collection",
            "Street Lights",
            "Traffic Signals",
            "Illegal Construction",
            "Sewage Issues",
            "Noise Pollution",
            "Harassment",
            "Discrimination",
            "Fraud",
            "Internet & Telecom Issues"
          ], 
    },
    image:{
        type:String,
        default:null
    },
    location: { 
        type: String, 
        required: true 
    },
    citizen: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, // Complaint creator
    officer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Officer" 
    }, // Assigned officer (if approved)
    status: { 
        type: String, 
        enum: ["pending", "approved", "in-progress", "completed", "rejected"], 
        default: "pending" 
    },
    rejectionReason: { 
        type: String ,
        default:null
    }, 
    remarks:{
        type:[String],
        default:[]
    }       // Officer's remarks (if any)
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", ComplaintSchema);
export default Complaint;
