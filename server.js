const express = require('express');
const path = require('path');


const app = express();


app.use(express.static('./dist/movie-list'));

app.get('/*',(req,res) => res.sendFile('index.html', {root: 'dist/movie-list/'}));


app.listen(process.env.PORT || 8080);
       
