<<<<<<< HEAD
// import { db } from "../db/database.js"4
import Mongoose from "mongoose"
import { useVirtualId } from "../db/database.js"

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    url: String
})

useVirtualId(userSchema)
const User = Mongoose.model('User', userSchema)

export async function findByUsername(username){
    return User.findOne({username})
=======
// import { db } from "../db/database.js"
import SQ from 'sequelize'
import { sequelize } from '../db/database.js'

const DataTypes = SQ.DataTypes

export const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        url: DataTypes.TEXT,
    },
    { timestamps: false }
)

export async function findByUsername(username){
    return User.findOne({ where: { username }})
>>>>>>> c39132a9bd29261d4d5454761c32d94d5ca1b06a
    // return db.execute('SELECT * FROM users WHERE username = ?', [username]).then((result) => result[0][0])
}

export async function findById(id){
    // return db.execute('SELECT * FROM users WHERE id = ?', [id]).then((result) => result[0][0])
<<<<<<< HEAD
    return User.findById(id)
}

export async function createUser(user){
    return new User(user).save().then((data) => data.id)
    // const { username, password, name, email, url } = user
    // return db.execute('INSERT INTO users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => console.log)
=======
    return User.findByPk(id)
}

export async function createUser(user){
    // const { username, password, name, email, url } = user
    // return db.execute('INSERT INTO users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId)
    return User.create(user).then((data) => data.dataValues.id)
>>>>>>> c39132a9bd29261d4d5454761c32d94d5ca1b06a
}
