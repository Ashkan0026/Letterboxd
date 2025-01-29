const {createDBIfNotExists} = require("./utils/utility")
const {initialize, getReply, insertReply, getUserReplies, getMovieReplies} = require("./db/mainDB")
const {User} = require("./model/users")
const {Follows} = require("./model/follows")
const {Movie} = require("./model/movies")
const {Reply} = require("./model/replies")
const express = require("express")
const path = require("path")
const moviesRoutes = require('./routes/movies');
require("dotenv").config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 9090
const db_file = process.env.DB_FILE || "main.db"
const db_dir = process.env.DB_DIR || "database"

// add routes here
// Use movies routes
app.use('/api', moviesRoutes);


app.listen(port, () => {
    console.log("server is listening on port ", port)  
    createDBIfNotExists(db_dir, db_file)
    const dbPath = path.join(db_dir, db_file)
    initialize(dbPath)
})