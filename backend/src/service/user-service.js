import UserRepository from '../repository/user-repository.js';
import { checkUserAccess, checkUserUpdateAccess } from '../utils/authUtils.js';
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async updateUser(id, data) {
    try {
      const updatedUser = await this.userRepository.updateUser(id, data);
      return updatedUser;
    } catch (error) {
      console.log('Something went wrong in user-service', error);
      throw error;
    }
  }

  async getUser(currentUser, id) {
    try {
      console.log('currentUser', currentUser);
      if (!checkUserAccess(currentUser.id, id, currentUser.role)) {
        throw new Error('Access denied: You can only view your own data or if you are an admin.');
      }

      const response = await this.userRepository.getUser(id);
      return response;
    } catch (error) {
      console.log('Something went wrong in user-service ', error);
      throw error;
    }
  }
  

  async deleteUser(id,currentUser) {
    try {

      if (!checkUserAccess(currentUser.id, id, currentUser.role)) {
            throw new Error('Access denied: You can only delete your own data or if you are an admin.');
      }

      const user = await this.userRepository.deleteUser(id);
      return user;
    } catch (error) {
      console.error("Error in UserService while soft deleting user:", error);
      throw error;
    }
  }

//   async findUser(id){
//     try {
//       const response = await this.userRepository.getUser(id);
//       return response;
//     } catch (error) {
//       console.error("Error in UserService finding user", error);
//       throw error;
//     }
//   }
}

export default UserService;