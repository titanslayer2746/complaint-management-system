import Complaint from "../model/complaintSchema.js";
import User from "../model/userSchema.js";

class ComplaintRepository {
  constructor() {
    this.complaintModel = Complaint;
    this.userModel = User;
  }

  async createComplaint(data) {
    try {
      const complaint = await this.complaintModel.create(data);
      return complaint;
    } catch (error) {
      console.log(
        "Something went wrong in repo layer while creating complaint",
        error
      );
      throw error;
    }
  }

  async updateComplaint(id, data) {
    try {
      const complaint = await this.complaintModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return complaint;
    } catch (error) {
      console.log(
        "Something went wrong in repo layer while updating complaint",
        error
      );
      throw error;
    }
  }

  async getComplaintById(id) {
    try {
      const complaint = await this.complaintModel.findById(id);
      return complaint;
    } catch (error) {
      console.log(
        "Something went wrong in repo layer while finding complaint",
        error
      );
      throw error;
    }
  }

  async getComplaint() {
    try {
      const complaint = await this.complaintModel.find();
      return complaint;
    } catch (error) {
      console.log(
        "Something went wrong in repo layer while fetching complaints",
        error
      );
      throw error;
    }
  }

  async deleteComplaint(id) {
    try {
      const complaint = await this.complaintModel.findByIdAndDelete(id);
      return complaint;
    } catch (error) {
      console.log(
        "Something went wrong in repo layer while deleting complaint",
        error
      );
      throw error;
    }
  }

  async getComplaintByUser(userId) {
    try {
      const complaints = await this.complaintModel.find({ citizen: userId });
      console.log("The complaints are", complaints);
      return complaints;
    } catch (error) {
      console.log(
        "Something went wrong in repo layer while creating complaint",
        error
      );
      throw error;
    }
  }

  async getComplaintByFilter(filterData) {
    try {
      const filteredData = await this.complaintModel.find(filterData);
      return filteredData;
    } catch (error) {
      console.log(
        "Something went wrong in repo layer while creating complaint",
        error
      );
      throw error;
    }
  }

  async getComplaintByStatus(status) {
    try {
      const complaint = await this.complaintModel.find(status);
      return complaint;
    } catch (error) {
      console.log(
        "Something went wrong in repo layer while getting complaint",
        error
      );
      throw error;
    }
  }
}

export default ComplaintRepository;
