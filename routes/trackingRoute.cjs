const express = require('express')
const westZonePullFunc = require("../utils/westZonePull.cjs");
const carrPullFunc = require("../utils/carrPull.cjs");
const router = express.Router();

router.post('/indeed', async function(req, res){
    try {
        let { skill, location } = req.body
        let scrapeWest = await westZonePullFunc(skill, location);
        // let scrapeCarr = await carrPullFunc(skill, location);
        return res.status(200).send(JSON.stringify( {
            status: 'success',
            listWest: scrapeWest.listWest,
            listCarr: scrapeCarr
        }))
    } catch (e) {
        console.log(e)
    }

})


module.exports = router;