import express from "express";
import * as tweetRepository from '../controller/tweet.js'

const router = express.Router()

router.get('/', tweetRepository.getTweets)

router.get('/:id', tweetRepository.getTweet)

router.post('/', tweetRepository.createTweet)

router.put('/:id', tweetRepository.updateTweet)

router.delete('/:id', tweetRepository.deleteTweet)

export default router
