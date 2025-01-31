const db = require("../db/mainDB")
const {Reply} = require("../model/replies")

class FeedbackService{
    constructor(){
        this.db = db
    }

    async getReplies(){
        try{
            let replies = db.getAllReplies()
            
            return replies
        } catch (error){
            throw(error)
        }
    }

    async addReply(desc, score, userId, movie_id){
        try{

            let newReply = new Reply(0, score, desc, userId, movie_id);
            let res = db.insertReply(newReply);
            if(!res.success)
            {
                console.log(res.message)
            }
        } catch (error){
            throw(error)
        }
    }

    async getUserReply(userId){
        try{
            let replies = db.getUserReplies(userId);
            return replies
        } catch (error){
            throw(error)
        }
    }

    async getMovieReply(movieId){
        try{
            let replies = db.getMovieReplies(movieId);
            return replies
        } catch (error){
            throw(error)
        }
    }

    async deleteReply(replyId){
        try{
            let res = db.deleteReply(replyId);
            return res
        } catch (error){
            throw(error)
        }
    }
}

module.exports = FeedbackService;