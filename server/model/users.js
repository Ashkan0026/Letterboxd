class User {
    constructor(id, username, password, createdAt, isAdmin = false) {
        this._id = id
        this._username = username
        this._password = password
        this._createdAt = createdAt
        this._isAdmin = isAdmin
    }

    get id() {
        return this._id;
    }

    // Getter for username
    get username() {
    return this._username;
    }

    // Setter for username
    set username(value) {
    this._username = value;
    }

    // Getter for password
    get password() {
    return this._password;
    }

    // Setter for password
    set password(value) {
    this._password = value;
    }

    // Getter for isAdmin
    get isAdmin() {
    return this._isAdmin;
    }

    // Setter for isAdmin
    set isAdmin(value) {
    this._isAdmin = value;
    }

    // Getter for createdAt
    get createdAt() {
    return this._createdAt;
    }
}

module.exports = {
    User
}