const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db.cjs");
const Store = require("./storeModel.cjs")



class storeItem extends Model {}

storeItem.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    href: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hasDiscount: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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