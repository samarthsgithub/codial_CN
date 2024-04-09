const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;


app.use(express.urlencoded());
app.use(cookieParser());
// const expressLayouts = require('express-ejs-layouts');
// app.use(express.static('./assets' ))
// app.use(expressLayouts);
const db  = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

//extract style and scripts from subpages into layouts

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




// set up a view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie
app.use(session({
    name:'codial',
    //todo ---> change secret before deployment
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://samarthdb:samarth123@samarthdb.gp7idaw.mongodb.net/codial_development',
        mongooseConnection: db,
        autoRemove:'disabled'
    }),
    // function(err){
    //     consoele.log(err || 'connect-mongodb setup ok')
    // }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser)

//use express router
app.use ('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port ${port}`);
    console.log('i am samarth the boss');
})