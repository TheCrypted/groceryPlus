const {Sequelize} = require("sequelize");


const itemsDB = new Sequelize("itemsDB", "Aman04", "TheCrypted", {
    dialect: "sqlite",
    host: "./config/dbMain.sqlite"
})

module.exports = itemsDB