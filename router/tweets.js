import express from "express";

const router = express.Router()

let tweets = [
    {
        id: '1',
        text: '안녕하세요',
        createdAt: Date.now().toString(),
        name: '김사과',
        username: 'apple',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
    },
    {
        id: '2',
        text: '반갑습니다',
        createdAt: Date.now().toString(),
        name: '반하나',
        username: 'banana',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU'
    }
]

router.get('/', (req, res, next) => {
    const username = req.query.username
    const data = username
        ? tweets.filter((tweet) => tweet.username === username)
        : tweets
    res.status(200).json(data)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id(${id}) nor found`})
    }
})

// POST / tweets

router.post('/', (req, res, next) => {
    const {text, name, username} = req.body
    const tweet = {
        id: '10',
        text,
        createAt: Date.now().toString(),
        name,
        username
    }
    tweets = [tweet, ...tweets]
    res.status(201).json(tweet)
})

// PUT / tweet/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const text = req.body.text
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        tweet.text = text
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id(${id}) nor found`})
    }
})


// DELETE / tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    tweets = tweets.filter((tweet) => tweet.id !== id)
    res.sendStatus(204)
})

export default router
