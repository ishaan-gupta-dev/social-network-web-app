const express = require('express');
const app = express();
const port = 8000;

app.listen(port,function(err){
    if(err){
        console.log(`Error! ${err} \nCannot start the server on port ${port} `);
    }

    console.log(`Success! \nServer running on port ${port}`);
})