const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class Store extends Model {}

Store.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize, modelName: "userTable"
})

module.exports = Store;