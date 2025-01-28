const fs = require("fs")
const path = require("path")

/**
 * 
 * @param {String} dbDir 
 * @returns 
 */
function checkIfDBDirExists(dbDir) {
    if(!fs.existsSync(dbDir)) {
        console.log("dir don't exist")
        return false
    }
    return true
}

function createDBDir(dbDir) {
    fs.mkdirSync(dbDir)
}

/**
 * 
 * @param {String} dbPath 
 */
function checkIfDBFileExists(dbPath) {
    if(!fs.existsSync(dbPath))
    {
        console.log("file don't exists")
        return false
    }
    return true
}

/**
 * 
 * @param {String} dbPath 
 */
function createDBFile(dbPath) {
    fs.writeFileSync(dbPath, '')
}

function createDBIfNotExists(dbDir, dbFile) {
    const dbPath = path.join(dbDir, dbFile)
    if(!checkIfDBDirExists(dbDir)) {
        createDBDir(dbDir)
    }

    if(!checkIfDBFileExists(dbPath)) {
        createDBFile(dbPath)
    }
}

module.exports = {
    createDBIfNotExists
}