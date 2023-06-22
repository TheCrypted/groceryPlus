const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");
const Store = require("/storeModel.cjs")



class storeItem extends Model {}

storeItem.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    storeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Store,
            key: "id"
        }
    }

}, {
    sequelize, modelName: "itemModel"
})

storeItem.belongsTo(Store)

module.exports = storeItem;