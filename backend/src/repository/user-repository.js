import User from "../model/userSchema.js";


class UserRepository {
  constructor() {
    this.userModel = User;
  }

  async updateUser(id, data) {
    try {
      const response = await this.userModel.findOneAndUpdate({ _id: id }, data, { new: true }); // Use _id
      return response;
    } catch (error) {
      console.log('Something went wrong in user repo', error);
      throw error;
    }
  }

  async getUser(id) {
    try {
      const user = await this.userModel.findOne({ _id: id }); 
      return user;
    } catch (error) {
      console.log('Something went wrong in user repo', error);
      throw error;
    }
  }

  async deleteUser(id){
    try {
      const user=await this.userModel.findByIdAndUpdate(id,{new:true});
      return user;
    } catch (error) {
      console.log('Something went wrong in user repo', error);
      throw error;
    }
  }

}

export default UserRepository;
