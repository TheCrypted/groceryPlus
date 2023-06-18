require(".env").config()
const express = require('express')
const scheduler = require('node-cron')
const app = express();
const PORT = 3040;
const email = process.env.MAIL_ID;
const PWD = process.env.PWD;

scheduler.schedule("* * * * *", ()=>{
    console.log("5 stars")
})

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
});