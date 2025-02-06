class Reply {
    constructor(id, score, desc, user_id, movie_id) {
        this._id = id;
        this._score = score;
        this._desc = desc;
        this._user_id = user_id;
        this._movie_id = movie_id;
    }
  
    // Getter for ID
    get id() {
      return this._id;
    }
  
    // Getter for score
    get score() {
      return this._score;
    }
  
    // Setter for score
    set score(value) {
      this._score = value;
    }
  
    // Getter for description
    get desc() {
      return this._desc;
    }
  
    // Setter for description
    set desc(value) {
      this._desc = value;
    }
  
    // Getter for user ID
    get user_id() {
      return this._user_id;
    }
  
    // Setter for user ID
    set user_id(value) {
      this._user_id = value;
    }
  
    // Getter for movie ID
    get movie_id() {
      return this._movie_id;
    }
  
    // Setter for movie ID
    set movie_id(value) {
      this._movie_id = value;
    }
}
class ReplyWithUser extends Reply {
    constructor(id, score, desc, user_id, movie_id, user_name) {
        super(id, score, desc, user_id, movie_id);
        this._user_name = user_name;
    }
  
    // Getter for user name
    get user_name() {
      return this._user_name;
    }
  
    // Setter for user name
    set user_name(value) {
      this._user_name = value;
    }
}

module.exports = {
    Reply,
    ReplyWithUser
}