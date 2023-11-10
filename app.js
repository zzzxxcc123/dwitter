import express from "express"
import morgan from "morgan"
import tweetsRouter from "./router/tweets.js"
import authRouter from "./router/auth.js"
import { config } from "./config.js"
import cors from 'cors'
import { initSocket } from "./connection/socket.js"
import { db } from "./db/database.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// 라우터 객체 생성 
app.use('/tweets', tweetsRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
    res.sendStatus(404)
})

//db.getConnection().then(connection => console.log(connection))
const server = app.listen(config.host.port)
initSocket(server)