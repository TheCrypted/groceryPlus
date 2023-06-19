const express = require('express')
const cors = require('cors')
const {urlencoded} = require("express");
const routes = require("./routes/trackingRoute.cjs")
const app = express();
const PORT = 3030;


// scheduler.schedule("* * * * *", ()=>{
    console.log("sending email")


// })

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use("/api/v1", routes)

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
});