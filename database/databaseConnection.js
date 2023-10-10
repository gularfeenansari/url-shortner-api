require('dotenv/config')
const mysql = require('mysql2'); // importing library for database connection

//creating database connection
const db = mysql.createPool({
    host : process.env.host,   
    user : process.env.usr,           
    password : process.env.password,
    database : process.env.database
}).promise();


//Verifying database connection
(async function checkConnection(){
    await db.query('select DATABASE() as db').then((data)=>{
        if( data[0][0].db == process.env.database){
            console.log('Connected to database');
        }
    }).catch((error)=>{
        console.log(error);
    })
})();




module.exports = db; // exporting database connection