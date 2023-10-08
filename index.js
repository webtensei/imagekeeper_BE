require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router/index')
const app = express()
const multer = require('multer')
const upload = multer({dest:'uploads/'})
app.use(express.json())
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const allowed = true;
        if (allowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use('/api', router)


const start = async () => {

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=> console.log('connected to db'))
        app.listen(process.env.PORT, () => console.log(`server started at ${process.env.PORT}`))

    } catch (e) {
        console.log(e)
    }
}
start()