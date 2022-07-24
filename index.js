const express = require('express');
const router = require('./routes');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// use static files (css,js)
app.use(express.static('./assets'));

// use the layouts
app.use(expresslayouts);

// extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express routers
app.use('/', require('./routes/index'));

// set the views and view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error! ${err} \nCannot start the server on port ${port} `);
    }

    console.log(`Success! \nServer running on port ${port}`);
})