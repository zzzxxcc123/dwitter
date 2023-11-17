import express from "express"
import morgan from "morgan"
import tweetsRouter from "./router/tweets.js"
import authRouter from "./router/auth.js"
import { config } from "./config.js"
import cors from 'cors'
import { initSocket } from "./connection/socket.js"
<<<<<<< HEAD
import { connectDB } from "./db/database.js"
=======
import { sequelize } from "./db/database.js"
>>>>>>> c39132a9bd29261d4d5454761c32d94d5ca1b06a

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

<<<<<<< HEAD
connectDB().then(() => {
    const server = app.listen(config.host.port)
    initSocket(server)
}).catch(console.error)
=======
sequelize.sync().then(() => {
    const server = app.listen(config.host.port)
    initSocket(server)
})
>>>>>>> c39132a9bd29261d4d5454761c32d94d5ca1b06a
