const express = require('express')
const westZonePullFunc = require("../utils/westZonePull.cjs");
const router = express.Router();

router.post('/indeed', async function(req, res){
    try {
        let { skill, location } = req.body
        let scrape = await westZonePullFunc(skill, location);
        return res.status(200).send(JSON.stringify( {
            status: 'success',
            list: scrape.list
        }))
    } catch (e) {
        console.log(e)
    }

})


module.exports = router;