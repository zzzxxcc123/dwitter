import { getUsers } from "../db/database.js"
import MongoDb from 'mongodb'

const ObjectID = MongoDb.ObjectId


export async function findByUsername(username){
    // return db.execute('SELECT * FROM users WHERE username = ?', [username]).then((result) => result[0][0])
    return getUsers().find({ username }).next().then(mapOptionalUser)
}

export async function findById(id){
    // return db.execute('SELECT * FROM users WHERE id = ?', [id]).then((result) => result[0][0])
    return getUsers().find( { _id: new ObjectID(id) })
        .next()
        .then(mapOptionalUser)
}

export async function createUser(user){
    // const { username, password, name, email, url } = user
    // return db.execute('INSERT INTO users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => console.log)
    return getUsers().insertOne(user).then((result) => result.insertedId.toString())
}

function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user
}