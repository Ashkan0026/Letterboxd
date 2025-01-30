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
        created_at TIMESTAMP NOT NULL ON CONFLICT FAIL DEFAULT CURRENT_TIMESTAMP,
        CHECK(following_user_id != follower_user_id)
        );
    `);
}

function initializeMoviesTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS movies(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        title VARCHAR(20) NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        desc VARCHAR(80) NOT NULL ON CONFLICT FAIL, 
        genre VARCHAR(50) NOT NULL ON CONFLICT FAIL, 
        image_path VARCHAR(60) NOT NULL ON CONFLICT FAIL, 
        build_year INTEGER NOT NULL ON CONFLICT FAIL, 
        added_by INTEGER NOT NULL ON CONFLICT FAIL REFERENCES [users]([id]) ON DELETE CASCADE ON UPDATE CASCADE, 
        CHECK([build_year] > 1920 AND [build_year] < 2026));
    `);
}

function initializeRepliesTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS replies (
        [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        [score] FLOAT NOT NULL ON CONFLICT FAIL, 
        [desc] VARCHAR(80) NOT NULL ON CONFLICT FAIL, 
        [user_id] INTEGER NOT NULL ON CONFLICT FAIL REFERENCES [users]([id]) ON DELETE CASCADE ON UPDATE CASCADE, 
        [movie_id] INTEGER NOT NULL ON CONFLICT FAIL REFERENCES [movies]([id]) ON DELETE CASCADE ON UPDATE CASCADE);
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

function deleteUser(user_id) {
    const deleteStmt = db.prepare("DELETE FROM users WHERE id = ?")

    try {
        deleteStmt.run(user_id)
        return {success: true, message: "User deleted successfully"}
    } catch(error) {
        return {success: false, message: error.message}
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
    const stmt = db.prepare(`SELECT users.id AS id, users.username AS username, users.created_at AS createdAt, users.isAdmin AS isAdmin FROM users INNER JOIN follows WHERE users.id = follows.follower_user_id AND follows.following_user_id = ?;`)
    
    try {
        const rows = stmt.all(user_id)
        const followers = rows.map(row => new User(row.id, row.username, "", row.createdAt, row.isAdmin))

        return {followers: followers, success: true, message: "All followers"}
    } catch(error) {
        return {followers: [], success: false, message: error.message}
    }
}

function getUserFollowings(user_id) {
    const stmt = db.prepare("SELECT users.id AS id, users.username AS username, users.created_at AS created_at, users.isAdmin AS isAdmin FROM users INNER JOIN follows WHERE users.id = follows.following_user_id AND follows.follower_user_id = ?;")
    try {
        const rows =  stmt.all(user_id)
        const followings = rows.map(row => new User(row.id, row.username, "", row.createdAt, row.isAdmin))
        
        return {followings: followings, success: true, message: "All followings"}
    } catch(error) {
        return {followings: [], success: false, message: error.message}
    }
}

/**
 * 
 * @param {Movie} movie 
 */
function insertMovie(movie) {
    const insertStmt = db.prepare("INSERT INTO movies (title, desc, genre, image_path, build_year, added_by) VALUES (?, ?, ?, ?, ?, ?)") 

    try {
        insertStmt.run(movie._title, movie._desc, movie._genre, movie._image_path, movie._build_year, movie._added_by)
        return {success: true, message: "movie added successfully"}
    } catch(error) {
        return {success: false, message: error.message}
    }
}

function getMovie(movie_id) {
    const stmt = db.prepare("SELECT * FROM movies WHERE id = ? LIMIT 1")

    try {
        const movieData = stmt.get(movie_id)
        const movie = new Movie(movieData.id, movieData.title, movieData.desc, movieData.genre, movieData.image_path, movieData.build_year, movieData.added_by)
    
        return {movie: movie, success: true, message: ""}
    } catch(error) {
        return {movie: null, success: false, message: error.message}
    }
} 

function getMovies() {
    const stmt = db.prepare("SELECT * FROM movies")

    try {
        const rows = stmt.all()
        const movies = rows.map(row => new Movie(row.id, row.title, row.desc, row.genre, row.image_path, row.build_year, row.added_by))
        return {movies: movies, success: true, message: ""}
    } catch(error) {
        return {movies: [], success: false, message: error.message}
    }
}

function getUserMovies(user_id) {
    const stmt = db.prepare("SELECT * FROM movies WHERE added_by = ?")

    try {
        const rows = stmt.all(user_id)
        const movies = rows.map(row => new Movie(row.id, row.title, row.desc, row.genre, row.image_path, row.build_year, row.added_by))
        return {movies: movies, success: true, message: ""}
    } catch(error) {
        return {movies: [], success: false, message: error.message}
    }
}

/**
 * 
 * @param {Movie} movie 
 */
function editMovie(movie) { 
    let query = "UPDATE movies SET";
    let params = [];
    let first = true;
    if(movie._title !== undefined && movie._title !== null && movie._title !== "") {
        if(!first) {
            query += ","
        }
        query += " title = ?";
        params.push(movie._title)
        first = false
    }
    if(movie._desc !== undefined && movie._desc !== null && movie._desc !== "") {
        if(!first) {
            query += ","
        }
        query += " desc = ?";
        params.push(movie._desc);
        first = false
    }
    if(movie._genre !== undefined && movie._genre !== null && movie._genre !== "") {
        if(!first) {
            query += ","
        }
        query += " genre = ?";
        params.push(movie._genre)
        first = false;
    }
    if(movie._image_path !== undefined && movie._image_path !== null && movie._image_path !== "") {
        if(!first) {
            query += ","
        }
        query += " image_path = ?";
        params.push(movie._image_path);
        first = false;
    }
    if(movie._build_year !== undefined && movie._build_year !== null && movie._build_year !== 0) {
        if(!first) {
            query += ","
        }
        query += " build_year = ?";
        params.push(movie._build_year);
        first = false;
    }
    query += " WHERE id = ?"
    params.push(movie._id)
    console.log(query)
    const stmt = db.prepare(query)
    
    try {
        const res = stmt.run(...params)
        console.log(res)
        return {success: true, message: "Movie updated successfully"}
    } catch(error) {
        return {success: false, message: error.message}
    }
}

function deleteMovie(movie_id) {
    const stmt = db.prepare("DELETE FROM movies WHERE id = ?")

    try {
        stmt.run(movie_id)
        return {success: true, message: "movie updated successfully"}
    } catch(error) {
        return {success: false, message: error.message}
    }
}

/**
 * 
 * @param {Reply} Reply 
 */
function insertReply(reply) {
    const stmt = db.prepare("INSERT INTO replies (score, desc, user_id, movie_id) VALUES (?, ?, ?, ?)")
    
    try {
        stmt.run(reply._score, reply._desc, reply._user_id, reply._movie_id)
        return {success: true, message: "Reply added successfully"}
    } catch(error) {
        return {success: false, message: error.message}
    }
}

function getReply(reply_id) {
    const stmt = db.prepare("SELECT * FROM replies WHERE id = ? LIMIT 1")

    try {
        const replyData = stmt.get(reply_id)
        const reply = new Reply(replyData.id, replyData.score, replyData.desc, replyData.user_id, replyData.movie_id)
        return {reply: reply, success: true, message: ""}
    } catch(error) {
        return {reply: null, success: false, message: error.message}
    }
}

function getMovieReplies(movie_id) {
    const stmt = db.prepare("SELECT * FROM replies WHERE movie_id = ?")

    try {
        const rows = stmt.all(movie_id)
        const replies = rows.map(row => new Reply(row.id, row.score, row.desc, row.user_id, row.movie_id))
        return {replies: replies, success: true, message: ""}
    } catch(error) {
        return {replies: [], success: false, message: error.message}
    }
}

function getUserReplies(user_id) {
    const stmt = db.prepare("SELECT * FROM replies WHERE user_id = ?")

    try {
        const rows = stmt.all(user_id)
        const replies = rows.map(row => new Reply(row.id, row.score, row.desc, row.user_id, row.movie_id))
        return {replies: replies, success: true, message: ""}
    } catch(error) {
        return {replies: [], success: false, message: error.message}
    }
}

module.exports = {
    initialize,
    getSpecifiedUser,
    getSpecifiedUserForLogin,
    insertSignupUser,
    checkIfUserExists,
    insertFollows,
    getFollow,
    getUserFollowers,
    getUserFollowings,
    insertMovie,
    getMovie,
    getMovies,
    getUserMovies,
    editMovie,
    deleteMovie,
    insertReply,
    getReply,
    getUserReplies,
    getMovieReplies,
    deleteUser
}