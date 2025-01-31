const { generateToken, authenticateToken, authorizeRole } = require('../utils/jwt');
const AuthenticationService = require('../services/authenticationService');

class AuthenticationController {
  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  async login(req, res){
    try{
        const {username, password} = req.body;
        let token = await this.authenticationService.login(username, password, 'user');
        return res.status(200).json({ token });
    } catch(error){
      res.status(401).json({message: error.message});
    }
  }
}

module.exports = AuthenticationController;