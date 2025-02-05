const db = require("../db/mainDB")
const {User} = require("../model/users")

class UserService{
    constructor(){
        this.db = db
    }

    async getUsers(){
        try{
            let users = db.getAllUsers();
            return users.users
        } catch (error){
            throw(error)
        }
    }

    async getUserByUsername(username) {
        try {
            let user = db.getUserByUsername(username);
            return user.user;
        } catch (error) {
            throw(error);
        }
    }

    async deleteUser(userId){
        try{
            let res = db.deleteUser(userId);
            return res
        } catch (error){
            throw(error)
        }
    }

    async editUser(userId, username, password){
        try{
            let user = new User(userId, username, password);
            let res = db.editUser(user)
            return res
        } catch (error){
            throw(error)
        }
    }
}

module.exports = UserService;
