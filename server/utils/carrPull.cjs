const puppeteer = require("puppeteer");
const Item = require("../models/storeItemModel.cjs");

let data = {
    list : []
}


async function carrPullFunc() {
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage();
    let origLink = "https://www.carrefouruae.com/mafuae/en/fruits-vegetables/n/c/clp_circular-icon-fruits-vegetables"

    await page.goto(origLink, {
        timeout: 0,
        waitUntil: "networkidle0"
    });

    await page.evaluate(() => {
        window.scrollTo({ top: 1800, behavior: 'smooth' });
    });
    await page.waitForSelector('.css-rz0elg', { visible: true })
    let entriesCarr = await page.evaluate(async (data) => {
        // data.listCarr = [];
        let entries = []

        let itemsInit = document.getElementsByClassName("css-dub728");
        let items = Array.from(itemsInit);
        for (const item of items) {
            const index = items.indexOf(item);
            let weight = item.querySelector(".css-149zse0").innerText
            let title = weight ? item.querySelector("[data-testid=\"product_name\"]").innerText + " " + weight.split(" ")[0] : item.querySelector("[data-testid=\"product_name\"]").innerText;
            let price = "AED " + item.querySelector(".css-14zpref").innerText + item.querySelector(".css-1pjcwg4").innerHTML
            let href = item.querySelector("[data-testid=\"product_image_main\"]").src;
            let hasDiscount = item.querySelector("[data-testid=\"product-card-discount-price\"]") !== null;

            let rReg = /[\d|,|.|\+]+/g;
            let weightFind = title.match(rReg) ?  parseFloat(title.match(rReg)[0]) : null;
            let lastWord = item.title.split(" ")
            let pReg = /[Pp]/g
            let kReg = /[Kk]/g
            let lastWordA = lastWord[lastWord.length - 1]
            let packet = lastWordA.match(pReg) === null
            let kilos = lastWordA.match(kReg) !== null
            let weightA = weightFind > 10 ? (weightFind) : (weightFind) * 1000;
            let cost = parseFloat(price.split("D")[1].slice(1))
            title = title.split(weight.toString())[0].slice(0, 25)

            let itemEntry = {
                title: title,
                cost: cost,
                href: href,
                hasDiscount: hasDiscount,
                quantity: weightA,
                storeID: "C"
            }
            entries.push(itemEntry)
        }
        return entries;
    })

    await Item.bulkCreate(entriesCarr)
    console.log(`Successfully collected carrefour items`)
    await browser.close();
    return data
    }


module.exports = carrPullFunc;