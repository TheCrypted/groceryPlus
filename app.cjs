const express = require('express')
const cors = require('cors')
const {urlencoded} = require("express");
const routes = require("./routes/trackingRoute.cjs")
const westZonePullFunc = require("./utils/westZonePull.cjs")
const itemsDB = require("./config/db.cjs");
const Store = require("./models/storeModel.cjs")
const app = express();
const PORT = 3030;


// scheduler.schedule("* * * * *", ()=>{



// })

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));
let storeEntry = [
    {
        id: "C",
        name: "Carrefour"
    },
    {
        id: "L",
        name: "Lulu Hypermarket"
    }
]
await Store.bulkCreate(storeEntry)
await westZonePullFunc("alpha", "beta")
app.use("/api/v1", routes)

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
});