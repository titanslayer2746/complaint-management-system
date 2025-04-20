import express from 'express'
import { createOfficerVerification, listAllOfficers, loginUser, registerUser, listOfficerComplaints } from '../../controller/officerController.js';
import Officer from '../../model/officerSchema.js';

const router=express.Router();

router.post('/officer/login',loginUser);
router.post('/officer/register',registerUser);

router.get('/complaint-by-officer', listOfficerComplaints); // Assuming this function is defined in officerController.js
router.get('/get-all-officers',async (req, res) => {
  try {
    const officers = await Officer.find();
    return res.status(200).json({
      message: 'Successfully fetched all officers',
      success: true,
      data: officers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      err: error.message,
      data: [],
    });
  }
}
)

router.post('/officer-verification',createOfficerVerification);
router.get('/search-officers',listAllOfficers);


export default router;