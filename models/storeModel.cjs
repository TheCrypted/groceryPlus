const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db.cjs");


class Store extends Model {}

Store.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize, modelName: "storeTable"
})

module.exports = Store;