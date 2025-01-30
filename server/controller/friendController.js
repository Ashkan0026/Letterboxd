const FriendService = require('../services/friendService');

class FriendController {
    constructor() {
        this.friendService = new FriendService();
    }

    // add a new friend
    async addFriend(req, res){
        try{
            const { friend_id } = req.body;
            this.friendService.addFriend(req.user.id, friend_id);
            // Call the friend service
            // return friend id
            return res.status(200);
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // get friends of user by user_id in JWT
    async getMyFriends(req, res){
        try{
            const userId = req.user.id;

            let friends = (await this.friendService.getFriends(userId)).followers; 
            // Call the friend service

            // return friends
            return res.status(200).json({ friends });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // delete a friend
    async deleteFriend(req, res){
        try{
            // او دیگر دوست نیست. دشمن است!
            const friendId = req.params.friend_id;
            const userId = req.user.id;
            // Call the friend service

            this.friendService.deleteFriend(userId, friendId);

            return res.status(200).json({ message: 'Friend deleted successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }
  
  }
  
  module.exports = FriendController;