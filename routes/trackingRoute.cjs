const express = require('express')
const westZonePullFunc = require("../utils/westZonePull.cjs");
const carrPullFunc = require("../utils/carrPull.cjs");
const router = express.Router();
const itemsDB = require("../config/db.cjs");
const Item = require("../models/storeItemModel.cjs")

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


module.exports = router;