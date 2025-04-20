import express from 'express'
import { approveComplaint, rejectComplaint } from '../../controller/admin-controller.js';


const router=express.Router();

router.post('/approve-complaint',approveComplaint);
router.post('/reject-complaint',rejectComplaint);

export default router;