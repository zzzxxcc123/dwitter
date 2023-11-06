import express from "express";
import * as tweetRepository from '../controller/tweet.js'
import { body } from "express-validator"
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js"

const router = express.Router()

const validateTweet = [
    body('text').trim().isLength({min: 3}).withMessage('최소 3자이상 입력!'),  validate
]

/*
    post, put에 text에 빈문자열을 없에고. 3자이상 입력해야 저장되도록 API  적용
*/
router.get('/',isAuth , tweetRepository.getTweets)

router.get('/:id',isAuth , tweetRepository.getTweet)

router.post('/',isAuth , validateTweet,tweetRepository.createTweet)

router.put('/:id',isAuth , validateTweet, tweetRepository.updateTweet)

router.delete('/:id',isAuth , tweetRepository.deleteTweet)

export default router
