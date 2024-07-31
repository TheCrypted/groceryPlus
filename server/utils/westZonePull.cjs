const puppeteer = require("puppeteer");
const carrPullFunc = require("./noonPull.cjs");
const itemsDB = require("../config/db.cjs");
const Item = require("../models/storeItemModel.cjs")


async function westZonePullFunc() {
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage();

    let origLink = `https://www.luluhypermarket.com/en-ae/grocery-fresh-food-fruits-vegetables/c/HY00216090`
    await page.goto(origLink, {
        timeout: 0,
        waitUntil: "networkidle0"
    })
    let previousHeight = await page.evaluate('document.body.scrollHeight');
    let i = 0
    while (i < 4) {
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        const currentHeight = await page.evaluate('document.body.scrollHeight');
        if (currentHeight === previousHeight) {
            break;
        }
        previousHeight = currentHeight;
        i++
    }
    i = 0;
    let entriesLulu = await page.evaluate(async (data) => {
        let entries = []
        let itemsInit = document.getElementsByClassName("product__list--item")
        let items = Array.from(itemsInit).slice(0, 140)
        for (const item of items) {
            const index = items.indexOf(item);
            let imageHold = item.querySelector(".product-img")
            let hasDiscount = imageHold.querySelector(".discount-tag") !== null;
            let title = item.querySelector(".product-desc > h3") && item.querySelector(".product-desc > h3").innerHTML;
            let href = item.querySelector("img") && item.querySelector("img").src;
            let costItems = item.querySelectorAll(".product-price > span")
            let price = costItems[costItems.length-1].innerText

            let rReg = /[\d|,|.|\+]+/g;
            let weightFind = title.match(rReg) ?  parseFloat(title.match(rReg)[0]) : null;
            let lastWord = item.title.split(" ")
            let pReg = /[Pp]/g
            let kReg = /[Kk]/g
            let lastWordA = lastWord[lastWord.length - 1]
            let packet = lastWordA.match(pReg) === null
            let kilos = lastWordA.match(kReg) !== null
            let weight = weightFind > 10 ? (weightFind) : (weightFind) * 1000;
            let cost = parseFloat(price.split("D")[1].slice(1))
            title = title.split(weight.toString())[0].slice(0, 25)

            let itemEntry = {
                title: title,
                cost: cost,
                href: href,
                hasDiscount: hasDiscount,
                quantity: weight,
                storeID: "L"
            }
            entries.push(itemEntry)
        }
        return entries;
    })

    await Item.bulkCreate(entriesLulu)
    console.log(`Successfully collected items`)
    await browser.close();
}


module.exports = westZonePullFunc;