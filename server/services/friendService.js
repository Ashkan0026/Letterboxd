const db = require("../db/mainDB")
const {Follows} = require("../model/follows")

class FriendService{  
    constructor()
    {
        this.db = db
    }

    async getFriends(username){
        try{
            let friends = db.getUserFollowers(username);
            return friends
        } catch (error){
            throw(error)
        }
    }



    async addFriend(follower_user_id, following_user_id){
        try{

            var follow = new Follows(0, following_user_id, follower_user_id, new Date());
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