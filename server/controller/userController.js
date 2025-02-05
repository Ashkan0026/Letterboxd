const User = require('../model/users');
const UserService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    // get all users
    async getUsers(req, res){
        try{
            let users = await this.userService.getUsers();
            return res.status(200).json({ users});
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // get user by username
    async getUserByUsername(req, res) {
        try {
            const username = req.params.username;
            let user = await this.userService.getUserByUsername(username);
            return res.status(200).json({ user });
        } catch(error) {
            res.status(404).json({message: error.message});
        }
    }

    async deleteUser(req, res){
        try{
            this.userService.deleteUser(req.params.username);

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    async editUser(req, res){
        try{
            const userId = req.params.username;
            const { username, email, password } = req.body;
            //todo not implemented

            return res.status(200).json({ message: 'User edited successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }
  
}
  
module.exports = UserController;
