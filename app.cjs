const express = require('express')
const cors = require('cors')
const scheduler = require('node-cron')
const {transporter, options} = require("./services/email.cjs");
const routes = require("./routes/trackingRoute.cjs")
const {urlencoded} = require("express");
const app = express();
const PORT = 3040;


// scheduler.schedule("* * * * *", ()=>{
    console.log("sending email")
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email sent with info ${info}`);
        }
    })


// })

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use("/tracking-pixel", routes)

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
});