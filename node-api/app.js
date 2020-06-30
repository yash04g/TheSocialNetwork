const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
// Connecting Database
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()
//db connection
mongoose.connect(
    process.env.MONGO_URI,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`)
});

// Bring in the routes
const postRoutes = require("./routes/post")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
//API Docs
app.get('/', (req, res) => {
    fs.readFile('docs/APIDocs.json', (err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        const docs = JSON.parse(data)
        res.json(docs);
    })
})
// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error : "Unauthorized!"});
    }
});

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("Server is running at Port : " + PORT);
})
