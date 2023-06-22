const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db.cjs");


class Store extends Model {}

Store.init({
    id: {
        type: DataTypes.STRING,
        isPrimaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize, modelName: "userTable"
})

module.exports = Store;