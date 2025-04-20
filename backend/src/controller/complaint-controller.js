import ComplaintService from "../service/complaint-service.js";
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/server-config.js";
import Complaint from "../model/complaintSchema.js";
import nodemailer from 'nodemailer';
import User from "../model/userSchema.js";
import Officer from "../model/officerSchema.js";

const complaintService=new ComplaintService();


const streamUpload = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "complaints",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    // Push the buffer to the Cloudinary stream
    uploadStream.end(fileBuffer);
  });
};

const createComplaint = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploadResult = await streamUpload(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    } else {
      console.log("No file provided");
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id; // Extract user ID from the token

    const complaintData = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      category: req.body.category,
      citizen: userId,
      image: imageUrl,
    };

    const complaint = await complaintService.createComplaint(complaintData);

    return res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating complaint",
      error: error.message,
    });
  }
};

const updateComplaint=async (req,res)=>{
    try {
        const {id}=req.params;
        const complaint=await complaintService.updateComplaint(id,req.body);
        if(!complaint){
            return res.status(404).json({
                success:false,
                message:'Complaint not found',
                error:{}
            })
        }
        return res.status(200).json({
            success:true,
            message:'Complaint updated successfully',
            data:complaint,
            error:{}
        })
    } catch (error) {
        console.log('Something went wrong in controller layer while updating complaint',error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong in controller layer while updating complaint',
            error:error.message
        })
    }
};

const getComplaintById=async (req,res)=>{
    try {
        const {id}= req.params;
        const data= await complaintService.getComplaintById(id);
        if(!data){
            return res.status(404).json({
                success:false,
                message:'Complaint not found',
                error:{}
            })
        }
        return res.status(200).json({
            success:true,
            message:'Complaint fetched successfully',
            data:data,
            error:{}
        })
    } catch (error) {
        console.log('Something went wrong in controller layer while getting complaint',error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong in controller layer while getting complaint',
            error:error.message
        }) 
    }
}

const getComplaint=async (req,res)=>{
    try {
        const data= await complaintService.getComplaint();
        if(!data){
            return res.status(404).json({
                success:false,
                message:'Complaint not found',
                error:{}
            })
        }
        return res.status(200).json({
            success:true,
            message:'Complaint fetched successfully',
            data:data,
            error:{}
        })
    } catch (error) {
        console.log('Something went wrong in controller layer while getting complaint',error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong in controller layer while getting complaint',
            error:error.message
        }) 
    }
}

const deleteComplaint=async (req,res)=>{
    try {
        const {id}=req.params;
        const complaint=await complaintService.deleteComplaint(id);
        if(!complaint){
            return res.status(404).json({
                success:false,
                message:'Complaint not found',
                error:{}
            })
        }
        return res.status(200).json({
            success:true,
            message:'Complaint deleted successfully',
            data:complaint,
            error:{}
        })
    } catch (error) {
        console.log('Something went wrong in controller layer while delete complaint',error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong in controller layer while delete complaint',
            error:error.message
        })   
    }
}

const getComplaintByUser=async (req,res)=>{
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res.status(401).json({
          success: false,
          message: "Authorization header is missing",
          error: {},
        });
      }
      const token = authorizationHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id; // Extract user ID from the token
      console.log(userId);
        const complaints=await complaintService.getComplaintByUser(userId);
        return res.status(200).json({
            success:true,
            message:'Complaint fetched successfully',
            data:complaints,
            error:{}
        })
    } catch (error) {
        console.log('Something went wrong in controller layer while getting complaint',error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong in controller layer while getting complaint',
            error:error.message
        })    
    }
}

const getComplaints = async (req, res) => {
    try {
      const filters = {...req.query};
      console.log(filters);
      const complaints = await complaintService.getComplaintByFilter(filters);
  
      res.status(200).json({
        success: true,
        count: complaints.length,
        data: complaints,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

const getComplaintByStatus=async(req,res)=>{
    try {
        const filters = {...req.query};
        console.log(filters);
        const complaints = await complaintService.getComplaintByFilter(filters);
    
        res.status(200).json({
          success: true,
          count: complaints.length,
          data: complaints,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
}

const updateComplaintStatusByOfficer = async (req, res) => {
    try {
        const { id } = req.body;
        const { status, remarks } = req.body;

        console.log("req.body is ", req.body);
        
        const authorization = req.headers.authorization;
        console.log("authorization is ", authorization);
        

        if (!authorization) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
                data: [],
            });
        }
        
        const token = authorization.split(" ")[1];
        console.log("token is" ,token);
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
                success: false,
                data: [],
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded is ", decoded);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
                data: [],
            });
        }
        const officerId = decoded.id; // Extract officer ID from the token
        console.log("officer id is", officerId);

        // Call the service function
        console.log("calling the service function");
        const updatedComplaint = await complaintService.updateComplaintStatusByOfficer(id, officerId, status, remarks);

        console.log("updated complaint is " ,updatedComplaint);
        if (!updatedComplaint) {
            return res.status(404).json({
                message: "Complaint not found",
                success: false,
                data: [],
            });
        }
        const user = await User.findById(updatedComplaint.citizen);
        const officer=await Officer.findById(officerId);
        console.log("user is ", user);
        const citizenEmail = user.email;
        const officerName = officer.name; // Ensure officerName is in the updated complaint or fetch it if needed
        const department = officer.category; // Ensure department is in the updated complaint or fetch it if needed
        const officerPhone = officer.phone; 
        
        if (status === 'completed') {
          // Create a nodemailer transporter
          const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: process.env.EMAIL_USER, // Use your Gmail address
                  pass: process.env.EMAIL_PASS, // Use your Gmail password (consider using App Passwords if 2FA is enabled)
              },
          });

          // Email message options
          const mailOptions = {
              from: process.env.EMAIL_USER, // Sender address
              to: citizenEmail, // Citizen's email address
              subject: 'Complaint Resolved: Status Updated to Completed',
              html: `
                  <html>
                      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                          <div style="background-color: #32CD32; padding: 20px; color: white; text-align: center;">
                              <h2>Complaint Resolved</h2>
                          </div>
                          <div style="padding: 20px; background-color: white; border-radius: 5px;">
                              <p>Your complaint has been successfully resolved. Here are the details:</p>
                              <p><strong>Status:</strong> Completed</p>
                              <p><strong>Officer Name:</strong> ${officerName}</p>
                              <p><strong>Department:</strong> ${department}</p>
                              <p><strong>Officer Phone:</strong> ${officerPhone}</p>
                              <p><strong>Remarks:</strong> ${remarks}</p>
                          </div>
                          <div style="text-align: center; padding-top: 20px; color: #777;">
                              <p>Thank you for your patience!</p>
                          </div>
                      </body>
                  </html>
              `, // HTML content of the email
          };

          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log("Error sending email:", error);
              } else {
                  console.log("Email sent: " + info.response);
              }
          });
      }

        return res.status(200).json({
            message: "Complaint status updated successfully",
            success: true,
            data: updatedComplaint,
        });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const getComplaintStatusCounts = async (req, res) => {
  try {
    const counts = await Complaint.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert to object with keys like { pending: 10, completed: 5 }
    const result = counts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Optionally ensure all statuses are present (even if count is 0)
    const allStatuses = ['pending', 'in-progress', 'completed','rejected'];
    allStatuses.forEach(status => {
      if (!result[status]) result[status] = 0;
    });
    console.log("result is ", result);

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Error fetching status counts:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export {
    createComplaint,
    updateComplaint,
    getComplaintById,
    getComplaint,
    deleteComplaint,
    getComplaintByUser,
    getComplaints,
    getComplaintByStatus,
    updateComplaintStatusByOfficer,
    getComplaintStatusCounts


}