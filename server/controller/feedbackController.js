const FeedbackService = require('../services/feedbackService');

class FeedbackController {
  constructor() {
    this.feedbackService = new FeedbackService();
  }

  // register a new feedback
  // description and rate between 1 and 5
    async registerFeedback(req, res){
        try{
            const { description, rate, movie_id } = req.body;

            if (rate < 1 || rate > 5) {
                return res.status(400).json({ message: 'rate must be between 1 and 5' });
            }

            // Call the feedback service
            await this.feedbackService.addReply(description, rate, req.user.id, movie_id);

            return res.status(204).json({message: "Feedback added successfully"});
        } catch(error){
            return res.status(401).json({message: error.message});
        }
    }

    // get all feedbacks
    async getAllFeedbacks(req, res){
        try{
            // Call the feedback service

            let feedbacks = (await this.feedbackService.getReplies()).replies;

            // return feedbacks
            return res.status(200).json({ feedbacks });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }


    // get feedbacks by user_id in param
    async getFeedbacks(req, res){
        try{
            const userId = req.params.user_id;

            // Call the feedback service
            let feedbacks = (await this.feedbackService.getUserReply(userId)).replies;
            // return feedbacks
            return res.status(200).json({ feedbacks: feedbacks });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // get feedbacks of user by user_id in JWT
    async getMyFeedbacks(req, res){
        try{
            const userId = req.user.id;

            // Call the feedback service
            let feedbacks = (await this.feedbackService.getUserReply(userId)).replies;
            // return feedbacks
            return res.status(200).json({ feedbacks: [] });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // get feedbacks by movie_id in param
    async getMovieFeedbacks(req, res){
        try{
            const movieId = req.params.movie_id;

            // Call the feedback service
            let feedbacks = (await this.feedbackService.getMovieReply(movieId)).replies;
            // return feedbacks
            return res.status(200).json({ feedbacks });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

    // delete a feedback
    async deleteFeedback(req, res){
        try{
            const feedbackId = req.params.feedback_id;

            // Call the feedback service
            this.feedbackService.deleteReply(feedbackId);

            return res.status(200).json({ message: 'Feedback deleted successfully' });
        } catch(error){
            res.status(401).json({message: error.message});
        }
    }

}

module.exports = FeedbackController;