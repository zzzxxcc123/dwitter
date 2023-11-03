import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"

let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
    }
]

export async function create(id, username, password, name, email, url){
    const hash_pw = bcrypt.hashSync(password, 10)
    const user = {
        id,
        username,
        password: hash_pw,
        name,
        email,
        url
    }
    users = [user, ...users]
    return users
}

export async function get(username, password){
    const user = await users.find((user) => user.username === username)
    if(!user){
        return false
    }
    else{
        const stored_pw = user.password
        const result = await bcrypt.compareSync(password, stored_pw)
        return result
    }
}

export function getByUsername(username){
    const user = users.find((user) => user.username === username)
    return user
}

export function getJWT(username, password){
    const token = jwt.sign(
        {
            id: username,
            isAmin: false
        },
        password,
        { expiresIn: 1200 } 
    )
    return token
    
}

