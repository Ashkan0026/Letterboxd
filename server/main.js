const {createDBIfNotExists} = require("./utils/utility")
const {initialize, getUserFollowings, insertFollows, getFollow, insertSignupUser} = require("./db/mainDB")
const {User} = require("./model/users")
const {Follows} = require("./model/follows")
const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 9090
const db_file = process.env.DB_FILE || "main.db"
const db_dir = process.env.DB_DIR || "database"

app.listen(port, () => {
    console.log("server is listening on port ", port)  
    createDBIfNotExists(db_dir, db_file)
    const dbPath = path.join(db_dir, db_file)
    initialize(dbPath)

})