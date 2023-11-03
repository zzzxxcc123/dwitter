import express from "express"
import morgan from "morgan"
import tweetsRouter from "./router/tweets.js"
import authRouter from "./router/auth.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

// 라우터 객체 생성 
app.use('/tweets', tweetsRouter)
app.use('/users', authRouter)

app.use((req, res, next) => {
    res.sendStatus(404)
})

app.listen(9090)
