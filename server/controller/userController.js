const User = require('../model/users');
const UserService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    // get all users
    async getUsers(req, res){
        try{
            // Call the user service
            let users = await this.userService.getUsers();
            // return all users
            return res.status(200).json({ users});
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // delete a user
    async deleteUser(req, res){
        try{
            const userId = req.params.user_id;

            // Call the user service
            this.userService.deleteUser(userId);

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // edit a user
    async editUser(req, res){
        try{
            const userId = req.params.user_id;
            const { username, email, password } = req.body;

            // Call the user service

            return res.status(200).json({ message: 'User edited successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }
  
  }
  
  module.exports = UserController;