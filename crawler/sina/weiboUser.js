import puppeteer from 'puppeteer';
const args = process.argv;
const userName = args[2];

// const userName = '李荣浩';
const url = `https://s.weibo.com/user?q=${encodeURIComponent(userName)}&Refer=index`;
const visitUrl = async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    const nameList = await page.$$eval('.name', e => e.map(item => item.textContent));
    const imgList = await page.$$eval('.avator > a > img', e => e.map(item => item.src));
    const hrefList = await page.$$eval('.avator > a', e => e.map(item => item.href));
    const length = nameList.length;
    let detailList = [];
    for (let i = 0; i < length; i++) {
        detailList.push({
            name: nameList[i],
            avator: imgList[i],
            href: hrefList[i]
        })
    }
    // console.log(detailList);
    process.send({ list: detailList })
    await browser.close();
}

process.on('uncaughtException', (e) => {
    process.send(e);
    process.exit(1);
});

await visitUrl();