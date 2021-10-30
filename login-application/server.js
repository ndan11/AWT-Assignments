const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const { signUp, login } = require('./controllers/auth.controller')

const port = process.env.PORT || 4000
const mongo_url = process.env.MONGO_URL
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

mongoose.connect(mongo_url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.post('/signup',signUp)
app.get('/login',login)

app.listen(port,() => {
    console.log(`Server listening at port ${port}`)
    console.log("login application by Nadnan")
})