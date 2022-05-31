
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors'

import morgan from 'morgan';

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import connectDB from './db/connect.js';


import mongoSanitize from 'express-mongo-sanitize'

//routers
import authRouter from './routes/authRoutes.js'
import postsRouter from './routes/potsRoutes.js'

//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import authenticateUser from './middleware/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, './client/build')))
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
    })

} else {
    app.use(morgan('dev'))
}

app.use(express.json());
app.use(mongoSanitize())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts/AllMyPosts', authenticateUser, postsRouter)
app.use('/api/v1/posts', postsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(process.env.PORT || 5000)
    } catch (error) {
        console.log(error)
    }
}

start()