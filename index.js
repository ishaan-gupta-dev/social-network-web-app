const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
// require mongoStore
const MongoStore = require('connect-mongo');
// require sass middleware
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// set the seetings for sass and use it
app.use(
    sassMiddleware({
      src: './assets/scss',
      dest: './assets/css',
      debug: true,
      outputStyle: 'extended',
      prefix: '/css',
    })
  );
  

// use cookie parser
app.use(cookieParser());

// reading posts requests
app.use(express.urlencoded());

// use static files (css,js)
app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// use the layouts
app.use(expresslayouts);


// extract style and script from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set the views and view engine
app.set('view engine', 'ejs');
app.set('views', './views');

/* 
//set the session settings from express-session and use it
app.use(session({
    name: 'codeial',
    // TODO - change the secret before deployment in production mode
    secret: 'somethingsecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*10)
    }
})); 
*/
//
// mongoStore is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    secret: 'somethingsecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 10)
    },
    store: MongoStore.create({
        mongoUrl: db._connectionString,
        autoRemove: 'disabled'

    },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
/* app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: db._connectionString,
        autoRemove: 'disabled'
      })
})); */

// initialize the passport
app.use(passport.initialize());
// give the session to passport and use it
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use connect-flash
app.use(flash());
app.use(customMiddleware.setFlash);

// use express routers
// const router = require('./routes');
// app.use('/',router);
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error! ${err} \nCannot start the server on port ${port} `);
    }
    console.log(`Success! \nServer running on port ${port}`);
})