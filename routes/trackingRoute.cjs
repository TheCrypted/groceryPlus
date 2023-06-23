const express = require('express')
const westZonePullFunc = require("../utils/westZonePull.cjs");
const carrPullFunc = require("../utils/carrPull.cjs");
const router = express.Router();
const itemsDB = require("../config/db.cjs")
const Item = require("../models/storeItemModel.cjs")

itemsDB.sync().then(()=>{
    console.log("DB is ready")
})
router.post('/indeed', async function(req, res){
    try {
        let { skill, location } = req.body
        let scrape = await westZonePullFunc(skill, location);
        // let scrapeCarr = await carrPullFunc(skill, location);
        return res.status(200).send(JSON.stringify( {
            status: 'success',
            list: scrape.list,
        }))
    } catch (e) {
        console.log(e)
    }
})

router.get("/items", async (req, res) => {
    try {
        let items = await Item.findAll()
        res.status(200).send(JSON.stringify({
                status: "Success",
                list: items
            }))
    } catch (e) {
        res.status(503).send({
            status: "Failure"
        })
        console.log(e)
    }
})



module.exports = router;