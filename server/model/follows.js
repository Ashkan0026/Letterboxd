class Follows {
    constructor(id, following_username, follower_username, createdAt) {
        this._id = id;
        this._following_username = following_username;
        this._follower_username = follower_username;
        this._createdAt = createdAt;
    }

    // Getter for ID
    get id() {
        return this._id;
    }

    // Getter for following user ID
    get following_username() {
        return this._following_username;
    }

    // Setter for following user ID
    set following_username(value) {
        this._following_username = value;
    }

    // Getter for follower user ID
    get follower_username() {
        return this._follower_username;
    }

    // Setter for follower user ID
    set follower_username(value) {
        this._follower_username = value;
    }

    // Getter for createdAt
    get createdAt() {
        return this._createdAt;
    }

    displayInfo() {
        console.log(`${this._id} ${this._following_username} ${this._follower_username}`)
    }
}

module.exports = {
    Follows
}