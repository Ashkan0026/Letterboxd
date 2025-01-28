const {createDBIfNotExists} = require("./utils/utility")
const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()

app.use(express.json())

const port = process.env.PORT || 9090
app.listen(port, () => {
    console.log("server is listening on port ", port)
    createDBIfNotExists("database", "main.db")
})