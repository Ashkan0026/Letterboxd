const db = require("../db/mainDB")
const {Follows} = require("../model/follows")

class FriendService{  
    constructor()
    {
        this.db = db
    }

    async getFriends(userId){
        try{
            let friends = db.getUserFollowers(userId);
            return friends
        } catch (error){
            throw(error)
        }
    }

    async addFriend(userId, friendId){
        try{

            var follow = new Follows(0, friendId, userId, new Date());
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