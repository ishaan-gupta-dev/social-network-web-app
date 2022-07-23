const express = require('express');
const router = require('./routes');
const app = express();
const port = 8000;


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