const dotenv = require("dotenv")
dotenv.config();
const {MongoClient} = require("mongodb")

let _db;

const connectDB = async (callback) => {
    const client = new MongoClient(process.env.MONGODB_URI)
    try{
        _db = await client.connect()
        callback(null)
    } catch (e) {
        console.error(e)
        callback(e)
    }
}

const getDb = () => {
    if(!_db) {
        throw Error("DB not initialized")
    }
    return(_db)
}

module.exports = {connectDB, getDb}