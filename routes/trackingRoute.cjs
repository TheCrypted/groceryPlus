const express = require('express')
const westZonePullFunc = require("../utils/westZonePull.cjs");
const router = express.Router();
const itemsDB = require("../config/db.cjs")
const Item = require("../models/storeItemModel.cjs")
const User = require("../models/userModel.cjs")
const UserBasket = require("../models/userBasketModel.cjs")
const {Op, DataTypes, Sequelize} = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

itemsDB.sync().then(()=>{
    console.log("DB is ready")
})
function genToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name
    }
    const key = "qnWmmdNaYVmJy9H8WZ9rDLGuyolV7lGg"
    return jwt.sign(payload, key, {
        expiresIn: "1 hour"
    })
}
function authToken(req, res, next){
    const token = req.headers.auth
    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, "qnWmmdNaYVmJy9H8WZ9rDLGuyolV7lGg", (err, user)=>{
        if(err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user
        next()
    })
}
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

router.get("/protected", authToken, (req, res) => {
    res.status(201).send(JSON.stringify({
        message: "token verified",
        user: req.user
    }))
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
            if(passCheck) {
                let token = genToken(userExists)
                res.status(200).send(JSON.stringify({
                    status: "success",
                    token: token
                }))
            } else {
                res.status(403).send(JSON.stringify({
                    status: "failure",
                    message: "Invalid credentials"
                }))
            }
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

router.post("/newlist", authToken, async(req, res) => {
    try {
        let {itemIDs, listName, repeatDuration} = req.body;
        let user = req.user;
        for (let itemID of itemIDs) {
            let basketEntry = {
                itemID: itemID.itemID,
                userID: user.id,
                basketName: listName,
                basketRepeat: repeatDuration,
                itemQuantity: itemID.userQuantity
            }
            await UserBasket.create(basketEntry)
        }
        res.status(200).send(JSON.stringify({
            status: "success"
        }))
    } catch(e){
        console.log(e)
    }
})

router.get("/lists", authToken, async(req, res) => {
    try {
        let user = req.user;
        let userBaskets = await UserBasket.findAll({
            attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("basketName")), "userBaskets"]],
            where: {
                userID: user.id
            }
        })
        let basketItems = []
        for(let basket of userBaskets) {
            let basketItemsEntry = await UserBasket.findAll({
                include: [Item],
                where: {
                    userID: user.id,
                    basketName: basket.dataValues.userBaskets
                }
            })
            basketItems.push(basketItemsEntry)
        }
        res.status(200).json({
            basketItems: basketItems,
            status: "success"
        })
    } catch(e){
        console.log(e)
    }
})

router.delete("/deletelist/:listname", auth, async (req, res) => {
    try {
        const listName = req.params.listname
        console.log(listName)
        await UserBasket.destroy({
            where: {
                basketName: listName
            }
        })
        res.status(200).json({
            message: "success"
        })
    } catch(e){
        console.log(e)
        res.status(404).json({
            message: "failure"
        })
    }
})


module.exports = router;