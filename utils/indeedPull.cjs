const puppeteer = require("puppeteer");

let data = {
    list : []
}


async function indeedPullFunc(skill, location) {
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage();
    await page.goto(`https://ae.indeed.com/jobs?q=${skill}&l=${location}&vjk=3787a18c0292a40b`, {
        timeout: 0,
        waitUntil: "networkidle0"
    })
    let origLink = `https://ae.indeed.com/jobs?q=${skill}&l=${location}&vjk=3787a18c0292a40b`
    let hasNextPage = true;
    let i = 0
    while (hasNextPage && i < 10) {
        await page.goto(origLink, {
            timeout: 0,
            waitUntil: "networkidle0"
        })
        data = await page.evaluate(async (data) => {
                let jobsInit = document.getElementsByClassName("resultContent")
                let jobs = Array.from(jobsInit)
                jobs.forEach((job, index) => {
                    let title = job.querySelector("h2.jobTitle > a > span") && job.querySelector("h2.jobTitle > a > span").innerText;
                    let href = job.querySelector("h2.jobTitle > a") && job.querySelector("h2.jobTitle > a").href;
                    let salary = job.querySelector(".salary-snippet-container > div") && job.querySelector(".salary-snippet-container > div").innerText
                    if (!salary) {
                        salary = "Not given"
                    }
                    data.list.push({
                        title: title,
                        salary: salary,
                        href: href
                    })
                })
            return data
        }, data)

        origLink = await page.evaluate(async () => {
            let pagesInit = document.querySelector('[data-testid="pagination-page-next"]')
            return pagesInit.href;
        })
        console.log(origLink)
        if (!origLink) {
            console.log(origLink)
            hasNextPage = false
        }
        i++
    }

    // const jobData = await page.evaluate(async (data) => {
    //     let pagesInit = document.getElementsByClassName("e8ju0x50")
    //     let pages = Array.from(pagesInit).slice(1,-1)
    //     console.log(pages.length)
    //     for (const pageRef of pages) {
    //         await page.goto(pageRef.href, {
    //             timeout: 0,
    //             waitUntil: "networkidle0"
    //         })
    //         let jobsInit = document.getElementsByClassName("resultContent")
    //         let jobs = Array.from(jobsInit)
    //         jobs.forEach((job, index)=>{
    //             let title = job.querySelector("h2.jobTitle > a > span") && job.querySelector("h2.jobTitle > a > span").innerText;
    //             let href = job.querySelector("h2.jobTitle > a") && job.querySelector("h2.jobTitle > a").href;
    //             let salary = job.querySelector("div.metadata.attribute_snippet") && job.querySelector("div.metadata.attribute_snippet").innerText
    //             if (!salary) {
    //                 salary = "Not given"
    //             }
    //             data.list.push({
    //                 title: title,
    //                 salary: salary,
    //                 href: href
    //             })
    //         })
    //     }
    //     return data
    // }, data)

    console.log(`Successfully collected ${data.list.length} opportunities`)
    await browser.close();
    return data
    }


module.exports = indeedPullFunc;