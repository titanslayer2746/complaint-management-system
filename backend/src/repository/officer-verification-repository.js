import OfficerVerification from "../model/officerVerificationSchema.js";



class OfficerRepository{
    constructor(){
        this.officerModel=OfficerVerification;
    }

    async createOfficerVerification(officerData){
        try {
            const data=await this.officerModel.create(officerData);
            return data;
        } catch (error) {
            console.log('Something went wrong in creating officer verification in repository layer', error);
            throw error;
        }
    }
};


export default OfficerRepository;