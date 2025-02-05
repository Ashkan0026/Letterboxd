const {createDBIfNotExists} = require("./utils/utility")
const {initialize} = require("./db/mainDB")
const express = require("express")
const path = require("path")
const moviesRoutes = require('./routes/movies');
const authenticationRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');
const feedbackRoutes = require('./routes/feedback');
const friendsRoutes = require('./routes/freind');
const cors = require("cors");
require("dotenv").config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 9090
const db_file = process.env.DB_FILE || "main.db"
const db_dir = process.env.DB_DIR || "database"

// add routes here
app.use(cors());
app.use('/api', authenticationRoutes);
app.use('/api', moviesRoutes);
app.use('/api', userRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', friendsRoutes);


app.listen(port, () => {
    console.log("server is listening on port ", port)  
    createDBIfNotExists(db_dir, db_file)
    const dbPath = path.join(db_dir, db_file)
    initialize(dbPath)
})