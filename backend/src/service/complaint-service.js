import ComplaintRepository from "../repository/complaint-repository.js";


class ComplaintService{
    constructor(){
        this.complaintRepository=new ComplaintRepository();
    }

    async createComplaint(data){
        try{
            console.log('Creating complaint in service layer',data);
            const complaint = await this.complaintRepository.createComplaint(data);
            console.log('Complaint saved in service layer',complaint);
            return complaint;
        }
        catch(error){
            console.log('Something went wrong in service layer while creating complaint',error);
            throw error;
        }
    }

    async updateComplaint(id,data){
        try{
            const complaint = await this.complaintRepository.updateComplaint(id,data);
            return complaint;
        }
        catch(error){
            console.log('Something went wrong in service layer while updating complaint',error);
            throw error;
        }
    }

    async getComplaintById(id){
        try{
            const complaint = await this.complaintRepository.getComplaintById(id);
            return complaint;
        }
        catch(error){
            console.log('Something went wrong in service layer while finding complaint',error);
            throw error;
        }
    }

    async getComplaint(){
        try{
            const complaint = await this.complaintRepository.getComplaint();
            return complaint;
        }
        catch(error){
            console.log('Something went wrong in service layer while fetching complaints',error);
            throw error;
        }
    }

    async deleteComplaint(id){
        try{
            const complaint = await this.complaintRepository.deleteComplaint(id);
            return complaint;
        }
        catch(error){
            console.log('Something went wrong in service layer while deleting complaint',error);
            throw error;
        }
    }

    async getComplaintByUser(userId){
        try{
            const complaint = await this.complaintRepository.getComplaintByUser(userId);
            return complaint;
        }
        catch(error){
            console.log('Something went wrong in service layer while creating complaint',error);
            throw error;
        }
    }

    async getComplaintByFilter(filterData){
        try{
            let filter = {};

            if (filterData.status) filter.status = filterData.status;
            if (filterData.location) filter.location = filterData.location;
            if (filterData.category) filter.category = filterData.category;

            const filteredData = await this.complaintRepository.getComplaintByFilter(filterData);
            return filteredData;
        }
        catch(error){
            console.log('Something went wrong in service layer while creating complaint',error);
            throw error;
        }
    }

    async getComplaintByStatus(status){
        try{
            const complaint = await this.complaintRepository.getComplaintByStatus(status);
            return complaint;
        }
        catch(error){
            console.log('Something went wrong in service layer while creating complaint',error);
            throw error;
        }
    }

    async updateComplaintStatusByOfficer(id, officerId, status, remarks){
        try {
            console.log('Updating complaint status in service layer', { id, officerId, status, remarks });
            if (!["in-progress", "completed"].includes(status)) {
                throw new Error("Invalid status");
            }

            const complaint = await this.complaintRepository.getComplaintById(id);
            console.log('Complaint fetched in service layer', complaint);
            if (!complaint) {
                throw new Error("Complaint not found");
            }

            console.log("complaint.officer is ", complaint.officer);
            console.log("officerId is ", officerId);

            // Check if officer is assigned to this complaint
            if (complaint.officer.toString() !== officerId) {
                throw new Error("Unauthorized");
            }

            // Update status and remarks
            complaint.status = status;
            if (remarks) {
                complaint.remarks.push(remarks);
            }

            complaint.updatedAt = new Date();
            await complaint.save();

            return complaint;
        } catch (error) {
            console.log('Something went wrong in service layer while updating complaint status',error);
            throw error;
            
        }
    }

    
}


export default ComplaintService;