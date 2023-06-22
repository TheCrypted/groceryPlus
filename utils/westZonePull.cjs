const puppeteer = require("puppeteer");
const carrPullFunc = require("./carrPull.cjs");

let data = {
    list : [],
    listCarr: []
}


async function westZonePullFunc(skill, location) {
    const browser = await puppeteer.launch({headless: false})
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
    data = await page.evaluate(async (data) => {
        let itemsInit = document.getElementsByClassName("product__list--item")
        let items = Array.from(itemsInit)
        items.forEach((item, index) => {
            let imageHold = item.querySelector(".product-img")
            let hasDiscount = imageHold.querySelector(".discount-tag") !== null;
            let title = item.querySelector(".product-desc > h3") && item.querySelector(".product-desc > h3").innerHTML;
            let href = item.querySelector("img") && item.querySelector("img").src;
            let costItems = item.querySelectorAll(".product-price > span")
            let price = costItems[costItems.length-1].innerText
            data.list.push({
                title: title,
                cost: price,
                href: href,
                hasDiscount: hasDiscount,
                store: "W"
            })
        })
        return data
    }, data)

    origLink = "https://www.carrefouruae.com/mafuae/en/fruits-vegetables/n/c/clp_circular-icon-fruits-vegetables"

    await page.goto(origLink, {
        timeout: 0,
        waitUntil: "networkidle0"
    });

    await page.evaluate(() => {
        window.scrollTo({ top: 1500, behavior: 'smooth' });
    });
    await page.waitForSelector('.css-rz0elg', { visible: true })
    data = await page.evaluate(async (data) => {
        // data.listCarr = [];

        let itemsInit = document.getElementsByClassName("css-dub728");
        let items = Array.from(itemsInit);
        items.forEach((item, index) => {
            let weight = item.querySelector(".css-149zse0").innerText
            let title = weight ? item.querySelector("[data-testid=\"product_name\"]").innerText + " " + weight.split(" ")[0] : item.querySelector("[data-testid=\"product_name\"]").innerText;
            let price = item.querySelector(".css-14zpref").innerText + item.querySelector(".css-1pjcwg4").innerHTML
            let href = item.querySelector("[data-testid=\"product_image_main\"]").src;
            let hasDiscount = item.querySelector("[data-testid=\"product-card-discount-price\"]") !== null;
            console.log("created entry")
            data.list.push({
                title: title,
                cost: price,
                href: href,
                hasDiscount: hasDiscount,
                store: "C"
            });
        });
        return data;
    }, data)

    console.log(`Successfully collected ${data.list.length} opportunities`)
    await browser.close();
    return data
}


module.exports = westZonePullFunc;