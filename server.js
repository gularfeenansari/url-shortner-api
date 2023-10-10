//importing libraries
require('dotenv/config')
const express = require('express');
const db = require('./database/databaseConnection')
const app = express();

app.use(express.json());
app.use(require('./router/index'))

//creating express server
app.listen(process.env.port,()=>{
    console.log(`Server running at PORT ${process.env.port}`);
})