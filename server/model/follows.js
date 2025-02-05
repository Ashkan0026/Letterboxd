class Follows {
    constructor(id, following_user_id, follower_user_id, createdAt) {
        this._id = id;
        this._following_user_id = following_user_id;
        this._follower_user_id = follower_user_id;
        this._createdAt = createdAt;
    }

    // Getter for ID
    get id() {
        return this._id;
    }

    // Getter for following user ID
    get following_user_id() {
        return this._following_user_id;
    }

    // Setter for following user ID
    set following_user_id(value) {
        this._following_user_id = value;
    }

    // Getter for follower user ID
    get follower_user_id() {
        return this._follower_user_id;
    }

    // Setter for follower user ID
    set follower_user_id(value) {
        this._follower_user_id = value;
    }

    // Getter for createdAt
    get createdAt() {
        return this._createdAt;
    }

    displayInfo() {
        console.log(`${this._id} ${this._following_user_id} ${this._follower_user_id}`)
    }
}

module.exports = {
    Follows
}