const express = require('express')
const cors = require('cors')
const {urlencoded} = require("express");
const routes = require("./routes/trackingRoute.cjs")
const westZonePullFunc = require("./utils/westZonePull.cjs")
const noonPullFunc = require("./utils/noonPull.cjs")
const itemsDB = require("./config/db.cjs");
const Store = require("./models/storeModel.cjs")
const UserBasket = require("./models/userBasketModel.cjs")
const Items = require("./models/storeItemModel.cjs")
const carrPullFunc = require("./utils/carrPull.cjs");
const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));
itemsDB.sync().then(()=>{
    console.log("DB is ready")
})
const initializeApp = async () => {
    let storeEntry = [
        {
            id: "C",
            name: "Carrefour"
        },
        {
            id: "L",
            name: "Lulu Hypermarket"
        }, {
            id: "N",
            name: "Noon Online"
        }
    ];
    await UserBasket.destroy({truncate: true})
    // await Items.destroy({truncate: true})
    // await Store.destroy({truncate: true})
    // await Store.bulkCreate(storeEntry);
    // await westZonePullFunc();
    // await carrPullFunc();
    // await noonPullFunc()

    app.use("/api/v1", routes);

    app.listen(PORT, () => {
        console.log(`App is running at ${PORT}`);
    });
};

initializeApp().catch((error) => {
    console.error('Error occurred during app initialization:', error);
});