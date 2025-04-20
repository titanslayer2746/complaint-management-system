import mongoose from "mongoose";

const OfficerVerificationSchema = new mongoose.Schema({
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    badgeId: { 
        type: String, 
        unique: true, 
        required: true 
    }, // Govt-issued badge
});

const OfficerVerification = mongoose.model("OfficerVerification", OfficerVerificationSchema);
export default OfficerVerification;
