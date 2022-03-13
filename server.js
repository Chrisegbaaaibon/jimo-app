const express = require('express')
require('dotenv').config();
const bodyparser = require('body-parser');
const { db } = require('./database/connection');
const routes = require('./router/routes');

const app = express();

const PORT = process.env.PORT;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use('/api', routes)

app.get('/', (req, res)=>{
   res.send('ok!');
});

app.listen(PORT || 7000, db(), ()=>{
   console.log("Debut!")
})