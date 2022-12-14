require("dotenv").config();
const { API_PORT, MONGO_URI } = process.env;
const port = process.env.PORT || API_PORT;
const bodyParser = require ("body-parser");
const ejs = require ('ejs');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const express = require("express");
const dbConfig = require("./config/db");
//var uniqueValidator = require('mongoose-unique-validator');
const app = express();

const errors = require("./middleware/errors");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use (express.static(path.join(__dirname, '/public')));
app.use (express.static(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/', require('./routes/index'));
app.use ('/api', require('./routes/api'))


app.set('view engine', 'ejs');
// importing user model
const User = require("./model/user");
mongoose
    .connect(dbConfig.db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

app.use(errors.errorHandler);
app.use((req, res)=>{
    res.status(404).send('<b>Page Not Found (404 Error)</b>')
})

// server listening 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


