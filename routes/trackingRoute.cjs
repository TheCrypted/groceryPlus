const express = require('express')
const fs = require("fs");
const router = express.Router();

router.get('/', function(req, res){
    const transparentGif = Buffer.from(
        'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        'base64'
    );

    res.set('Content-Type', 'image/gif');
    res.send(transparentGif);
    console.log("email has been read")
})


module.exports = router;