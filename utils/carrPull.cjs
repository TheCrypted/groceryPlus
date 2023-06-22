const puppeteer = require("puppeteer");


async function carrPullFunc(skill, location, browser){
    // const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    let origLink = "https://www.carrefouruae.com/mafuae/en/fruits-vegetables/n/c/clp_circular-icon-fruits-vegetables"

    await page.goto(origLink, {
        timeout: 0,
        waitUntil: "networkidle0"
    });

    let data = page.evaluate(async () => {
        let data = [];

        let itemsInit = document.getElementsByClassName("css-dub728");
        let items = Array.from(itemsInit);
        items.forEach((item, index) => {
            let title = item.querySelector("[data-testid=\"product_name\"]").innerText;
            let price = item.querySelector(".css-14zpref").innerText + "." + item.querySelector("css-1pjcwg4").innerText
            let href = item.querySelector("[data-testid=\"product_image_main\"]").src;
            let hasDiscount = item.querySelector("[data-testid=\"product-card-original-price\"]") !== null;
            data.push({
                title: title,
                cost: price,
                href: href,
                hasDiscount: hasDiscount
            });
        });
        return data;
    })
    console.log(`Successfully pulled ${data.length} items`);
    // await browser.close();
    return data;
}

module.exports = carrPullFunc;