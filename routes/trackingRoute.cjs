const express = require('express')
const westZonePullFunc = require("../utils/westZonePull.cjs");
const carrPullFunc = require("../utils/noonPull.cjs");
const router = express.Router();
const itemsDB = require("../config/db.cjs")
const Item = require("../models/storeItemModel.cjs")
const User = require("../models/userModel.cjs")
const {Op} = require("sequelize");
const bcrypt = require("bcrypt");

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

router.post("/signup", async function(req, res){
    try {
        let {name, email, password} = req.body;
        let userExists = await User.findOne({
            where: {
                email: email
            }
        })
        if (userExists) {
            res.status(403).send(JSON.stringify({
                status: "failure",
                message: "User already exists"
            }))
        } else {
            let passCrypt = await bcrypt.hash(password, 10)
            let userEntry = {
                name: name,
                email: email,
                password: passCrypt
            }
            await User.create(userEntry)
            res.status(200).send(JSON.stringify({
                status: "success"
            }))
        }
    } catch(e) {
        console.log(e)
    }
})

router.post("/signin", async function(req, res){
    try {
        let {email, password} = req.body;
        let userExists = await User.findOne({
            where: {
                email: email
            }
        })
        if (!userExists) {
            res.status(403).send(JSON.stringify({
                status: "failure",
                message: "User does not exist"
            }))
        } else {
            let passCheck = await bcrypt.compare(password, userExists.password)
            res.status(200).send(JSON.stringify({
                status: "success"
            }))
        }
    } catch (e) {
        console.log(e)
    }
})
router.get("/itemsquery", async (req, res) => {
    const q = req.query.q;
    try {
        let items = await Item.findAll({
            where: {
                title: {
                    [Op.like]: `%${q}%`
                }
            }
        })
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
router.get("/items", async (req, res) => {
    try {
        let items = await Item.findAll({
            order: [["hasDiscount", "DESC"]]
        })
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