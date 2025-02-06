const db = require("../db/mainDB")
const {Follows} = require("../model/follows")

class FriendService{  
    constructor()
    {
        this.db = db
    }

    async getFriends(username){
        try{
            const user = db.getSpecifiedUser(username);
            let friends = db.getUserFollowers(user.user._username);
            return friends
        } catch (error){
            throw(error)
        }
    }



    async addFriend(follower_user_id, following_user_id){
        try{
            const following = db.getSpecifiedUser(follower_user_id);
            const follower = db.getSpecifiedUser(following_user_id);
            const follow = new Follows(0, following.user._username, follower.user._username, new Date());
            let res = db.insertFollows(follow);
            return res
        } catch (error){
            throw(error)
        }
    }

    async deleteFriend(userId, friendId){
        try{
            let res = db.deleteFollows(userId, friendId);
            return res
        } catch (error){
            throw(error)
        }
    }

}  


module.exports = FriendService;