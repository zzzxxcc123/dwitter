import * as authContro from "../controller/auth.js"
import express from 'express'

const router = express.Router()

//    회원 가입
router.post('/signup', authContro.signup)

router.post('/login', authContro.logIn)

// 로그인 

export default router