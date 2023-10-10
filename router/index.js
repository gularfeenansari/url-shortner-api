require('dotenv/config')
const router = require('express').Router();
const db = require('../database/databaseConnection')
const shortId = require('shortid');
const validUrl = require('valid-url');





//Get method to get a url
router.get('/:path',async(req,res)=>{
    try {
        const [result,cols] = await db.query('select * from urls where urlcode=?',[req.params.path]);
        if(result[0]){
            res.redirect(result[0].longurl);
        }else{
            res.send('URL not found');
        }
    } catch (error) {
        res.send(error);
    }
})

//POST method to create a short url
router.post('/generate',async(req,res)=>{
    try {
        const {longurl} = req.body;
        if(validUrl.isUri(longurl)){
            const [result, cols] = await db.query('select * from urls where longurl=?',[longurl]);
            if(result[0]){
                res.send(result[0]);
            }else{
                const urlcode = shortId.generate();
                const shortUrl = process.env.baseUrl+urlcode;
                await db.query('insert into urls(longurl,shorturl,urlcode) values(?,?,?)',[longurl,shortUrl,urlcode]).then((data)=>{
                res.send({longurl,shortUrl});
            })
        }
        }else{
            res.send("Invalid Url");
        }
        
    } catch (error) {
        res.send(error);
    }

})

module.exports = router;