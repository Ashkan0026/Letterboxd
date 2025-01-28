const sqliteDatabase = require("better-sqlite3")
const {User} = require("../model/users")
const {Movie} = require("../model/movies")
const {Follows} = require("../model/follows")
const {Reply} = require("../model/replies")

let db = null

function initialize(dbPath) {
    if(dbPath == "") {
        return
    }
    db = new sqliteDatabase(dbPath)
    initializeUsersTable()
    initializeFollowsTable()
    initializeMoviesTable()
    initializeRepliesTable()
}

function initializeUsersTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
        username VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(30) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        isAdmin BOOLEAN NOT NULL,
        CHECK(password != '' AND username != '')
      );
    `);
}

function initializeFollowsTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS follows(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        following_user_id INTEGER NOT NULL ON CONFLICT FAIL REFERENCES [users]([id]) ON DELETE CASCADE ON UPDATE CASCADE, 
        follower_user_id INTEGER NOT NULL ON CONFLICT FAIL REFERENCES [users]([id]) ON DELETE CASCADE ON UPDATE CASCADE, 
        created_at TIMESTAMP NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL,
        CHECK(following_user_id != follower_user_id)
        );
    `);
}

function initializeMoviesTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS movies(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        title VARCHAR(20) NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        desc VARCHAR(80) NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        genre VARCHAR(50) NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        image_path VARCHAR(60) NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        build_year INTEGER NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        added_by INTEGER NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL REFERENCES [users]([id]) ON DELETE CASCADE ON UPDATE CASCADE, 
        CHECK([build_year] > 1920 AND [build_year] < 2026));
    `);
}

function initializeRepliesTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS replies (
        [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        [score] FLOAT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        [desc] VARCHAR(80) NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        [user_id] INTEGER NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL REFERENCES [users]([id]) ON DELETE CASCADE ON UPDATE CASCADE, 
        [movie_id] INTEGER NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL REFERENCES [movies]([id]) ON DELETE CASCADE ON UPDATE CASCADE);
    `);
}   

/**
 * 
 * @param {Number} user_id 
 */
function getSpecifiedUser(user_id) {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?")
    
    try {
        const userData = stmt.get(user_id)
        if(userData) {
            return {user: new User(userData.id, userData.username, userData.password, userData.created_at, userData.isAdmin), success: true, message: "User added successfully"};
        } else {
            return {user: null, success: false, message: "userData is not valid"}
        }
    } catch(error) {
        return {user: null, success: false, message: error.message}
    }
}

/**
 * 
 * @param {String} username 
 * @param {String} password 
 */
function getSpecifiedUserForLogin(username, password) {
    const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?")
    
    try {
        const userData = stmt.get(username, password)
        if(userData) {
            return {user: new User(userData.id, userData.username, userData.password, userData.created_at, userData.isAdmin), success: true, message: "User exists"};
        } else {
            return {user: null, success: false, message: "userData is not valid"}
        }
    } catch(error) {
        return {user: null, success: false, message: error.message}
    }
}

/**
 * 
 * @param {User} user 
 */
function insertSignupUser(user) {
    const insertStmt = db.prepare("INSERT INTO users (username, password, created_at, isAdmin) VALUES (?, ?, CURRENT_TIMESTAMP, ?)")
    try {
        insertStmt.run(user._username, user._password, user._isAdmin ? 1 : 0)
        return {success: true, message: "User added successfully"}
    }
    catch(error) {
        console.log(error)
        return {success: false, message: error.message}
    }
}

/**
 * 
 * @param {String} username 
 * @param {String} password 
 */
function checkIfUserExists(username, password) {
    const existsStmt = db.prepare("SELECT 1 FROM users WHERE username = ? AND password = ? LIMIT 1")

    try {
        const userData = existsStmt.get(username, password)
        return !!userData;
    } catch (error) {
        return false
    }
}

/**
 * 
 * @param {Follows} follows 
 */
function insertFollows(follows) {
    const insertStmt = db.prepare("INSERT INTO follows (following_user_id, follower_user_id, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)")

    try {
        insertStmt.run(follows._following_user_id, follows._follower_user_id)
        return {success: true, message: "Follow entry added successfully"}
    } catch(error) {
        return {success: false, message: error.message}
    }
}

function getFollow(follows_id) {
    const getStmt = db.prepare("SELECT * FROM follows WHERE id = ?")
    try {
        const followData = getStmt.get(follows_id)
        const follow = new Follows(followData.id, followData.following_user_id, followData.follower_user_id, followData.created_at)
        return {follow: follow, success: true, message: ""}
    } catch(error) {
        return {follow: null, success: false, message: error.message}
    }
}

function getUserFollowers(user_id) {
    const stmt = db.prepare("SELECT * FROM ")
}

module.exports = {
    initialize,
    getSpecifiedUser,
    getSpecifiedUserForLogin,
    insertSignupUser,
    checkIfUserExists,
    insertFollows,
    getFollow
}