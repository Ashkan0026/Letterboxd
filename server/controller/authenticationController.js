const { generateToken, authenticateToken, authorizeRole } = require('../utils/jwt');

class AuthenticationController {
  constructor() {
  }

  async login(req, res){
    try{
        const {username, password} = req.body;
        // Call the authentication service
        // if user exist return user data
        // else create a new user
        // return user id
        var userId = 1;
        const token = generateToken({ id: userId, role: 'user' });
        return res.status(200).json({ token });
    } catch(error){
      res.status(401).json({message: error.message});
    }
  }
}

module.exports = AuthenticationController;