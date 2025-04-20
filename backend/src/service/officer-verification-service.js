import officerRepository from "../repository/officer-verification-repository.js";


class OfficerService{
    constructor(){
        this.officerRepository=new officerRepository();
    }

    async createOfficerVerification(officerData){
        try {
            const data=await this.officerRepository.createOfficerVerification(officerData);
            return data;
        } catch (error) {
            console.log('Something went wrong in creating officer verification in service layer', error);
            throw error;
        }
    }
}

export default OfficerService;