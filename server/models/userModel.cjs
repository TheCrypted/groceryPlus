const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db.cjs");


class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    sequelize, modelName: "userTable"
})

module.exports = User