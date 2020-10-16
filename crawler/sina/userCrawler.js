import puppeteer from 'puppeteer';
import { cookie } from './constants/cookie.js';
import { sleep } from './utils/sleep.js';
import { qsParse } from './utils/qs.js';
const log4js = require("log4js");
const logger = log4js.getLogger("weibo");
logger.level = 'debug';

const url = 'https://weibo.com/leeyoungho';
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

const crawlerWeibo = async() => {
    await page.setCookie(...cookie);
    await page.goto(url);
    const pageCount = await getTotalPage();
    let currentPage = 1;
    while (currentPage <= pageCount) {
        console.log(`开始抓取第${currentPage}页`);
        await getWeiboContent(currentPage);
        console.log(`第${currentPage}页抓取完成`);
        countPage++;
    }
}

// 滚动直到出现分页
const scrollToPageBar = async() => {
    let pageBar = await page.$('div[node-type=feed_list_page]');
    while (!pageBar) {
        await page.evaluate((scrollStep) => {
            let scrollTop = document.scrollingElement.scrollTop;
            document.scrollingElement.scrollTop = scrollStep + scrollTop;
        }, 1000);
        await sleep(1000);
        pageBar = await page.$('div[node-type=feed_list_page]');
    }
}

// 获取总页数
const getTotalPage = async() => {
    await scrollToPageBar();
    const pageList = await page.$("div[node-type=feed_list_page] div > span > a");
    const pageInfo = await page.evaluate(async(pageList) => {
        let pageInfo = pageList.getAttribute("action-data");
        return pageInfo;
    }, pageList);
    const pageInfoObj = qsParse(pageInfo);
    const pageCount = pageInfoObj.countPage;
    return pageCount;
}

// 获取单页微博
const getWeiboContent = async(page) => {
    if (page !== 1) {
        await scrollToPageBar();
    };
    await page.evaluate(() => {
        document.scrollingElement.scrollTop = 300;
    });
    // 获取微博个数
    const count = await page.evaluate(() => {
        return $("div[action-type=feed_list_item]").length;
    });
    log.info('weibo count', count);
}


crawlerWeibo();