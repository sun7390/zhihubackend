import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: false });
import { cookie } from './constants/cookie.js';
async function openNewPage(newUrl) {
    const page = await browser.newPage();
    await page.setCookie(...cookie);
    page.goto(newUrl);
    await page
        .mainFrame()
        .addScriptTag({
            url: 'https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js'
        })
    await page.waitForTimeout(200)
    const wrapper = $('.WB_detail')[0];
    const content = $(wrapper).find("[action-type=feed_list_content]").text()
    await newPage.close();
    //切换回原始页面
    return JSON.stringify(content);
}

let content = openNewPage('https://weibo.com/1739046981/JnmLU4lqn?from=page_1004061739046981_profile&wvr=6&mod=weibotime&type=comment')
console.log(content);