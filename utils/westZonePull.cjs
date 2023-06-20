const puppeteer = require("puppeteer");

let data = {
    list : []
}


async function westZonePullFunc(skill, location) {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();

    let origLink = `https://www.luluhypermarket.com/en-ae/grocery-fresh-food-fruits-vegetables/c/HY00216090`
    let i = 0
    await page.goto(origLink, {
        timeout: 0,
        waitUntil: "networkidle0"
    })
    let previousHeight = await page.evaluate('document.body.scrollHeight');
    while (true) {
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        const currentHeight = await page.evaluate('document.body.scrollHeight');
        if (currentHeight === previousHeight) {
            break;
        }
        previousHeight = currentHeight;
    }
    data = await page.evaluate(async (data) => {
        let itemsInit = document.getElementsByClassName("product__list--item")
        let items = Array.from(itemsInit)
        items.forEach((item, index) => {
            let imageHold = item.querySelector(".product-img")
            let hasDiscount = imageHold.querySelector(".discount-tag") !== null;
            let title = item.querySelector(".product-desc > h3") && item.querySelector(".product-desc > h3").innerHTML;
            let href = imageHold.querySelector(".img-fluid") && item.querySelector(".img-fluid").src;
            let costItems = item.querySelectorAll(".product-price > span")
            let price = costItems[costItems.length-1].innerText
            data.list.push({
                title: title,
                cost: price,
                href: href,
                hasDiscount: hasDiscount
            })
        })
        return data
    }, data)

    console.log(`Successfully collected ${data.list.length} opportunities`)
    await browser.close();
    return data
}


module.exports = westZonePullFunc;