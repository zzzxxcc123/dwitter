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
    // return db.execute('SELECT * FROM users WHERE username = ?', [username]).then((result) => result[0][0])
}

export async function findById(id){
    // return db.execute('SELECT * FROM users WHERE id = ?', [id]).then((result) => result[0][0])
    return User.findByPk(id)
}

export async function createUser(user){
    // const { username, password, name, email, url } = user
    // return db.execute('INSERT INTO users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId)
    return User.create(user).then((data) => data.dataValues.id)
}
