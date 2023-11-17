// import mysql from 'mysql2'
<<<<<<< HEAD
import Mongoose from 'mongoose'
import { config } from '../config.js'
// import { initSocket } from '../connection/socket.js'

export async function connectDB(){
    return Mongoose.connect(config.db.host)
}

export function useVirtualId(schema){
    schema.virtual('id').get(function(){
        return this._id.toString()
    })
    schema.set('toJSON', { virtuals: true})
    schema.set('toObject', { virtuals: true})
}

let db

export function getTweets(){
    return db.collection('tweets')
}
=======
import { config } from '../config.js'
// import { initSocket } from '../connection/socket.js'
import SQ from 'sequelize'


const { host , user, database, password } = config.db
export const sequelize = new SQ.Sequelize(database, user, password, {
    host, 
    dialect: 'mysql',
    logging: false
})


>>>>>>> c39132a9bd29261d4d5454761c32d94d5ca1b06a


// const pool = mysql.createPool({
//     host: config.db.host,
//     user: config.db.user,
//     database: config.db.database,
//     password: config.db.password
// })

<<<<<<< HEAD
// export const db = pool.promise()
=======
// export const db = pool.promise()
>>>>>>> c39132a9bd29261d4d5454761c32d94d5ca1b06a
