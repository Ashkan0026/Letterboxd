const db = require("../db/mainDB")
const {User} = require("../model/users")
const { generateToken, authenticateToken, authorizeRole } = require('../utils/jwt');

// create authentication service class 
class AuthenticationService {
    constructor() {
        this.db = db
    }

    async login(username, password, role) {
        try
        {
            // check user exists
            let exists = db.checkIfUserExists(username)
            if (exists) {
                // check password
                let user = db.getSpecifiedUserForLogin(username, password)
                if (user.user.password === password) {
                    if(user.user._isAdmin)
                    {
                        role = 'admin'
                    }
                    let req = {id: user.user._id, role: role}
                    let token = generateToken(req)
                    return {token: token, user_id: user.user._id, isAdmin: user.user._isAdmin}
                } else {
                    throw new Error("Invalid password")
                }
            }

            // if user not exist, register user
            let res = await this.register(username, password)
            let req = {id: res.user_id, role: 'user'}
            let token = generateToken(req)
            return {token: token, user_id: res.user_id, isAdmin: res.isAdmin}
        } catch (error){
            throw(error)
        }
    }

    // register user and return user_id object
    async register(username, password) {
        try
        {
            let user = new User(0, username, password, new Date(), false)
            let res = db.insertSignupUser(user)
            return {user_id: res.user_id, isAdmin: res.isAdmin}
        } catch (error){
            throw(error)
        }
    }
}

module.exports = AuthenticationService