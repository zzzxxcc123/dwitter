import * as userInfo from '../data/auth.js' 

export async function signup(req, res, next){
    const { id, username, password, name, email, url } = req.body;
    const users = await userInfo.create(id, username, password, name, email, url);
    res.status(201).json(users);
}

export async function logIn(req, res, next){
    const {username, password} = req.body
    const result = await userInfo.get(username, password)
    if(result){
        res.status(200).json({message: `Tweet username(${username}) login success`})
    }
    else{
        res.status(404).json({message: `Tweet username(${username}) or password not correct`})
    }
}
