import * as userRepository from '../data/auth.js' 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { token } from 'morgan'
import {config } from '../config.js'

export async function signup(req, res){
    const { username, password, name, email, url } = req.body
    const found = await userRepository.findByUsername(username)
    if(found){
        return res.status(409).json({ message: `${username}이미 가입되었음`})
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds)
    const userId = await userRepository.createUser({
        username, 
        password: hashed,
        name,
        email,
        url
    })
    const token = createJwtToken(userId)
    res.status(201).json({token, username})
}

export async function login(req, res){
    //body에서 usernma 과 password 받아오기
    const { username, password } = req.body
    // username있는지 확인 하기(없으면 401)
    const user = await userRepository.findByUsername(username)
    // 있으면 비밀번호 비교하기 (틀리면 401)
    if(!user){
        return res.status(401).json({message: '아이디를 찾을 수 없음 '})
    }
    const isValidpassword = await bcrypt.compareSync(password, user.password)
    if(!isValidpassword){
        return res.status(401).json({message: '비밀번호 틀임'})
    }
    const token = createJwtToken(user.id)
    res.status(200).json({token, username})
    // 맞으면 토큰 생성(200)
}

function createJwtToken(id){
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec})
}

export async function me(req, res, next){
    const user = await userRepository.findById(req.userId)
    if(!user){
        return res.status(404).json({message: `사용자를 찾을 수 없음`})
    }
    return res.status(200).json({token: req.token, username: user.username})
}