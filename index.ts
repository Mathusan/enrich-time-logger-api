
import express , { Express ,Request , Response } from 'express';
import cors from 'cors';

import bodyparser from 'body-parser'
import cookieParser from 'cookie-parser'
import connection from './src/database/connection';

import  userRouter from './src/api/routes/user/userRoutes'

import config from './config/index'
import { corsOptions } from './config/corsOptions';
import { credentials } from './src/api/middlewares/credentials';
import { initializeLocalStrategy } from './src/stratergies/localStrategy';
import passport from 'passport';
import { initializeJwtStrategy } from './src/stratergies/accessJwtStrategy';
import { initializeRefreshJwtStrategy } from './src/stratergies/refreshJwtStrategy';
import { errorMiddleware } from './src/api/middlewares/errorHandler';
import timeRouter from './src/api/routes/time/timeRoutes';
const app : Express = express()

connection()


app.use(credentials)
app.use(cors(corsOptions))  
app.use(express.json())
app.use((bodyparser.urlencoded({ extended: true })))
app.use(cookieParser());

initializeLocalStrategy(passport)
initializeJwtStrategy(passport)
initializeRefreshJwtStrategy(passport)

app.use('/user', userRouter)
app.use('/time' , timeRouter)

app.use(errorMiddleware)

app.listen(config.port, ()=>{
    console.log(`Server running at ${config.port}`)
})
