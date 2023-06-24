const puppeteer = require("puppeteer");
const itemsDB = require("../config/db.cjs")
const Item = require("../models/storeItemModel.cjs")

itemsDB.sync().then(()=>{
    console.log("DB synced noonPull")
})
async function noonPullFunc(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    let origLink = "https://grocery.noon.com/daily-fresh-produce"

    await page.goto(origLink, {
        timeout: 0,
        waitUntil: "networkidle0"
    });
    let previousHeight = await page.evaluate('document.body.scrollHeight');
    let i = 0
    while (true) {
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        const currentHeight = await page.evaluate('document.body.scrollHeight');
        if (currentHeight === previousHeight) {
            break;
        }
        previousHeight = currentHeight;
        i++
    }
    i = 0;
    let data = await page.evaluate(async () => {
        let data = [];
        let itemsCollection = document.getElementsByClassName("sc-1b0e2885-6");
        let items = Array.from(itemsCollection).slice(0, 140);
        items.forEach((item, index) => {
            let title = item.querySelector(".sc-ff0945f2-2 > button > p.title > span > span > span").innerText;
            let cost = item.querySelector(".sellingPrice").innerText;
            let href = item.querySelector(".productImage").src;
            let hasDiscount  = item.querySelector(".originalPrice") !== null;
            let weight;
            let itemCount = item.querySelector(".itemCount").textContent;
            if(hasDiscount){
                cost = parseFloat(cost.replace(item.querySelector(".originalPrice").textContent, ""))
            }
            let rReg = /[\d|,|-|.|\+]+/g;
            if (itemCount){
                let weightInit = itemCount.match(rReg)[0];
                let count = weightInit.split("-")
                weight = count.length > 1 ? (count[0] + count[1]) / 2 : count[0];
                weight = parseFloat(weight) > 4 ? parseFloat(weight) : parseFloat(weight) * 1000;
            }
            let itemEntry = {
                title: title,
                cost: cost,
                href: href,
                hasDiscount: hasDiscount,
                quantity: weight,
                storeID: "N"
            }
            data.push(itemEntry);
        })
        return data
    })
    await Item.bulkCreate(data)
    console.log(`Successfully pulled Noon items`);
    await browser.close();
    return data;
}

module.exports = noonPullFunc;