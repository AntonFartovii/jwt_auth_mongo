import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import mongoose from 'mongoose'
import {router} from "./router/index.js";


const PORT = process.env.PORT || 5000
const app = express()


app.use( express.json() )
app.use( cookieParser() )
app.use( cors() )
app.use ('/api', router)

const start = async () => {
    try {
        await app.listen(PORT, () => {`Server started on PORT = ${PORT}`})
        // await mongoose.connect( process.env.DB_URL, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // })
        console.log ( `Server started on PORT ${PORT}` )
    } catch (e) {
        console.log(e)
    }
}

start()