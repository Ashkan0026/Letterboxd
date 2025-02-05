const FriendService = require('../services/friendService');

class FriendController {
    constructor() {
        this.friendService = new FriendService();
    }

    // add a new friend
    async addFriend(req, res){
        try{
            const { following_user_id } = req.body;
            if (!following_user_id) {
                return res.status(400).json({ message: "Following username is required" });
            }
            const result = await this.friendService.addFriend(req.user.id, following_user_id);
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(200).json({message: "Friend added successfully"});
        } catch(error){
            res.status(500).json({message: error.message});
        }
    }

    async getMyFriends(req, res){
        try{
            const username = req.user.id;//todo
            let friends = (await this.friendService.getFriends(username)).followers;
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
