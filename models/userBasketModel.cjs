const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db.cjs");
const Item = require("./storeItemModel.cjs")
const User = require("./userModel.cjs")


class Basket extends Model {}

Basket.init({
    itemID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Item,
            key: "id"
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    basketName: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    basketRepeat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    itemQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize, modelName: "basketTable"
})

Basket.belongsTo(User)
Basket.hasMany(Item, {foreignKey: "id", sourceKey: "itemID", targetKey: "id"})

module.exports = Basket;