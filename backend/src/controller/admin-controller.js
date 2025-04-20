import Complaint from "../model/complaintSchema.js";
import User from "../model/userSchema.js";
import Officer from "../model/officerSchema.js";
import nodemailer from "nodemailer";

const approveComplaint = async (req, res) => {
    try {
        const { id } = req.body;
        const { officerId } = req.body;
        console.log(id, officerId);


        // 1️⃣ Find Complaint
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ success: false, message: "Complaint not found" });
        }

        // 2️⃣ Update Complaint Status
        complaint.status = "approved";
        complaint.officer = officerId;
        await complaint.save();

        // 3️⃣ Assign Complaint to Officer
        const officer = await Officer.findById(officerId);
        if (!officer) {
            return res.status(404).json({ success: false, message: "Officer not found" });
        }
        officer.assignedTasks.push(id);
        await officer.save();

        // 4️⃣ Get Citizen Info
        const citizen = await User.findById(complaint.citizen);
        if (!citizen) {
            return res.status(404).json({ success: false, message: "Citizen not found" });
        }

        // 5️⃣ Setup Email Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 📩 Styled Email to Citizen
        const citizenEmail = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px; text-align: center;">
        <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Complaint Approved ✅</h2>
            <p style="font-size: 16px; color: #333;">Dear <strong>${citizen.name}</strong>,</p>
            <p style="font-size: 16px; color: #555;">Your complaint titled <strong>"${complaint.title}"</strong> has been approved and assigned to an officer.</p>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="font-size: 16px; color: #333;"><strong>Assigned Officer:</strong> ${officer.name}</p>
                <p style="font-size: 16px; color: #333;"><strong>Officer Contact:</strong> ${officer.phone}</p>
            </div>

            <p style="font-size: 14px; color: #777;">We appreciate your patience and cooperation.</p>
            
            <p style="font-size: 14px; color: #333;"><strong>Best Regards,</strong><br>Complaint Management System</p>
        </div>
    </div>
`;


        // 📩 Styled Email to Officer
        const officerEmail = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px; text-align: center;">
        <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2196F3; border-bottom: 2px solid #2196F3; padding-bottom: 10px;">New Complaint Assigned 📌</h2>
            <p style="font-size: 16px; color: #333;">Dear <strong>${officer.name}</strong>,</p>
            <p style="font-size: 16px; color: #555;">You have been assigned a new complaint. Please address the issue as soon as possible.</p>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="font-size: 16px; color: #333;"><strong>Complaint Title:</strong> ${complaint.title}</p>
                <p style="font-size: 16px; color: #333;"><strong>Description:</strong> ${complaint.description}</p>
                <p style="font-size: 16px; color: #333;"><strong>Citizen Name:</strong> ${citizen.name}</p>
                <p style="font-size: 16px; color: #333;"><strong>Citizen Contact:</strong> ${citizen.phone}</p>
            </div>

            <a href="http://your-app.com/officer-dashboard" style="display: inline-block; background: #2196F3; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 15px;">
                View Complaint
            </a>

            <p style="font-size: 14px; color: #777; margin-top: 15px;">Thank you for your service.</p>

            <p style="font-size: 14px; color: #333;"><strong>Best Regards,</strong><br>Complaint Management System</p>
        </div>
    </div>
`;


        // Send Email to Citizen
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: citizen.email,
            subject: "Complaint Approved ✅",
            html: citizenEmail
        });

        // Send Email to Officer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: officer.email,
            subject: "New Complaint Assigned 📌",
            html: officerEmail
        });

        res.status(200).json({
            success: true,
            message: "Complaint approved, officer assigned, and emails sent successfully."
        });

    } catch (error) {
        console.error("Error approving complaint:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const rejectComplaint = async (req, res) => {
    try {
        const { id } = req.body;
        const { rejectionReason } = req.body || "Unspecified";

        const complaint = await Complaint.findById(id).populate("citizen");
        console.log(complaint);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // Update status and store rejection reason
        complaint.status = "rejected";
        complaint.rejectionReason = rejectionReason;
        await complaint.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send rejection email
        const rejectionEmail = `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px; text-align: center;">
                <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #E53935; border-bottom: 2px solid #E53935; padding-bottom: 10px;">Complaint Rejected ❌</h2>
                    <p style="font-size: 16px; color: #333;">Dear <strong>${complaint.citizen.name}</strong>,</p>
                    <p style="font-size: 16px; color: #555;">We regret to inform you that your complaint titled <strong>"${complaint.title}"</strong> has been rejected.</p>
                    
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p style="font-size: 16px; color: #333;"><strong>Reason for Rejection:</strong></p>
                        <p style="font-size: 16px; color: #E53935;"><em>"${rejectionReason}"</em></p>
                    </div>

                    <p style="font-size: 14px; color: #777;">For further inquiries, please contact the support team.</p>

                    <p style="font-size: 14px; color: #333;"><strong>Best Regards,</strong><br>Complaint Management System</p>
                </div>
            </div>
        `;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: complaint.citizen.email,
            subject: "Complaint Rejected ❌",
            html: rejectionEmail
        });

        res.status(200).json({ message: "Complaint rejected and email sent." });
    } catch (error) {
        console.error("Error rejecting complaint:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};





export { 
    approveComplaint,
    rejectComplaint
};
