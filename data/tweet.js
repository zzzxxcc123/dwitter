import SQ from "sequelize";
import { sequelize } from '../db/database.js';
import { User } from "./auth.js";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
const Tweet = sequelize.define(
    "tweet",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,                        
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);
Tweet.belongsTo(User);


const INCLUDE_USER = {
    attributes: [
        "id", "text", "createdAt", "userId", 
            [Sequelize.col("user.name"), "name"], 
            [Sequelize.col("user.username"), "username"], 
            [Sequelize.col("user.url"), "url"],
            // 조인 시 객체를 생성하기 때문에 하위레벨에서 가져오기 위해 Sequlize.col로 가져와야 한다.
    ],
    include: {
        model: User,
        attributes: []
    }
}

const ORDER_DESC = {
    order: [["createdAt", "DESC"]]
}

export async function create(text, userId){
    return Tweet.create({ text, userId })
        .then((data) => this.getById(data.dataValues.id));
}

export async function getById(id){
    return Tweet.findOne({ where: { id }, ...INCLUDE_USER });
}

export async function getAll(){
    return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC});        
    // 객체를 대입할 때 객체 내의 값의 주소가 달라질 수 있기 때문에 객체를 복사해서 넣어주도록 한다.
}

export async function getAllByUsername(username){
    return Tweet.findAll({
        ...INCLUDE_USER, ...ORDER_DESC, include: {
            ...INCLUDE_USER.include, where: { username }
        }
    });
}

export async function update(id, text){
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.text = text;
        return tweet.save();
    });
} 

export async function remove(id){
    return Tweet.findByPk(id).then((tweet) => {
        tweet.destroy();
    });
} 








// const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';

// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

// export async function getAll() {
//     return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
// }
// export async function getAllByUsername(username) {
//     return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0]);
// }
// export async function getById(id) {
//     return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
//         .then((result) => result[0][0]);
// }
// export async function create(text, userId) {
//     return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [text, new Date(), userId])
//         .then((result) => getById(result[0].insertId));
// }
// export async function update(id, text) {
//     return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));
// }
// export async function remove(id) {
//     return db.execute('DELETE FROM tweets WHERE id=?', [id]);
// }