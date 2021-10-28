const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const getError = require('./dbErrorHandler')
const exphbs = require('express-handlebars')
const app = express()
app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'index'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://ndan1:123@tracker.x1kzp.mongodb.net/{{database}}?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connectio
n error: ')); 
app.route('/signup')
        .get((req, res) => {
            res.render('signup')
        })
        .post(async (req, res) => {
            if (req.body.password != req.body.con_password) {
                res.render('signup', { error: "Passwords do not match." })
            }
            let user = new User({
                ...req.body
            })
            user.save((err, doc) => {
                if (err) {
                    console.log(err)
                    res.render('signup', { error: getError(err) })
                } else {
                    res.render('signin', { success: "New User registered." })
                }
            })
        }) 
app.route('/signin')
        .get((req, res) => {
            res.render('signin')
        })
        .post((req, res) => {
            try {
                User.findOne({ user: req.body.user })
                    .then(async (user) => {
                        if (user) {
                            if (user.authenticate(req.body.password)) {
                                return res.render('home')
                            }
                        }
                        res.render('signin', { error: "Incorrect Password entered." })
                    })
            } catch (error) {
                res.render('signin', { error: "User doesn not exist." })
            }
        }) 
app.listen(3000, () => {
            console.log("Server Running at Port 3000")
        })