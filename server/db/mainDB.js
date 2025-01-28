const sqliteDatabase = require("better-sqlite3")

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
        following_user_id INTEGER NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL REFERENCES [users]([id]) ON DELETE CASCADE ON UPDATE CASCADE, 
        follower_user_id INTEGER NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL REFERENCES [users]([id]) ON DELETE CASCADE ON UPDATE CASCADE, 
        created_at TIMESTAMP NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL);
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
        CREATE TABLE IF NOT EXISTS replies(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        score FLOAT NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        desc VARCHAR(80) NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL, 
        user_id INTEGER NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL REFERENCES [users]([id]), 
        movie_id INTEGER NOT NULL ON CONFLICT FAIL UNIQUE ON CONFLICT FAIL REFERENCES [movies]([id]));
    `);
}   

module.exports = {
    initialize
}