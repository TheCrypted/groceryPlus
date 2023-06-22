const {Sequelize} = require("sequelize");


const itemsDB = new Sequelize("itemsDB", "Aman04", "TheCrypted", {
    dialect: "sqlite",
    host: "./config/db.sqlite"
})

module.exports = itemsDB