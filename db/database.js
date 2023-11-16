import MongoDb from "mongodb"
import { config } from "../config.js"

let db

export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host)
        .then((client) => db = client.db())
}

export function getUsers(){
    return db.collection('users')
}

export function getTweets(){
    return db.collection('tweets')
}














// import mysql from 'mysql2'
// import { config } from '../config.js'
// import { initSocket } from '../connection/socket.js'

// const pool = mysql.createPool({
//     host: config.db.host,
//     user: config.db.user,
//     database: config.db.database,
//     password: config.db.password
// })

// export const db = pool.promise()