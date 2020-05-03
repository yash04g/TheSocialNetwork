const express = require("express");
const app = express();
const morgan = require("morgan");
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

// Middlewares
app.use(morgan('dev'));
app.use("/", postRoutes);

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("Server is running at Port : " + PORT);
})
