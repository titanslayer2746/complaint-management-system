import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { JWT_SECRET } from '../config/server-config.js';
import Officer from '../model/officerSchema.js';
import OfficerService from '../service/officer-verification-service.js';
import OfficerVerification from '../model/officerVerificationSchema.js';
import Complaint from '../model/complaintSchema.js';

const officerService=new OfficerService();

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Officer.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid user or password',
        success: false,
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token: token,
      data: user,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id:id }, JWT_SECRET, { expiresIn: '15d' });
};

const registerUser = async (req, res) => {
  const { name, email, password,category, badgeId, phone } = req.body;
  try {
    const exists = await Officer.findOne({ email });

    const verifiedOfficer = await OfficerVerification.findOne({email, badgeId });
        if (!verifiedOfficer) {
            return res.status(400).json({ message: "Officer verification failed. Badge ID not recognized." });
        }

    if (exists) {
      return res.status(200).json({
        message: 'Officer already exists',
        data: exists,
        success: true,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(402).json({
        message: 'Write a valid email',
        success: false,
      });
    }

    //hashing
    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALT);

    const newOfficer = new Officer({
      name: name,
      email: email,
      password: hashedPassword,
      phone:phone,
      badgeId: badgeId,
      category: category,
    });

    const officer = await newOfficer.save();

    const token = createToken(officer._id);
    console.log("token",token);
    res.status(202).json({
      message: 'Verified token',
      success: true,
      token: token,
      userId: officer._id,
      data: officer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const createOfficerVerification=async (req,res)=>{
    try {
        const data=await officerService.createOfficerVerification(req.body);
        return res.status(202).json({
            message:'Successfully created officer verification badge',
            data:data,
            success:true,
            err:{}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server error',
            success: false,
            err: error.message,
            data: {},
        });
    }
}

const listAllOfficers = async (req, res) => {
  try {
    const category = req.query.category?.trim(); // Extract category query

    let filter = {}; // Default: fetch all officers

    if (category && typeof category === "string") {
      filter = { category: { $regex: new RegExp(`\\b${category}`, "i") } };
    }

    const officers = await Officer.find(filter);

    if (!officers.length) {
      return res.status(404).json({
        message: "No officers found",
        success: false,
        data: [],
      });
    }

    return res.status(200).json({
      message: "Successfully fetched officers",
      success: true,
      data: officers,
    });
  } catch (error) {
    console.error("Error fetching officers:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      err: error.message,
      data: [],
    });
  }
};

const listOfficerComplaints = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
        data: [],
      });
    }
    
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const officerId = decoded.id; // Extract officer ID from the token
    console.log(officerId);

    const complaints = await Complaint.find({ officer: officerId });

    if (!complaints.length) {
      return res.status(404).json({
        message: "No complaints found for this officer",
        success: false,
        data: [],
      });
    }

    return res.status(200).json({
      message: "Successfully fetched complaints",
      success: true,
      data: complaints,
    });
  } catch (error) {
    console.error("Error fetching officer complaints:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      err: error.message,
      data: [],
    });
  }
} 






export { 
    loginUser, 
    registerUser, 
    createOfficerVerification,
    listAllOfficers,
    listOfficerComplaints

};