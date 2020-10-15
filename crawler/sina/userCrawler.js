import puppeteer from 'puppeteer';
import { cookie } from './constants/cookie.js';

const url = 'https://weibo.com/leeyoungho';
const crawlerWeibo = async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setCookie(...cookie);
    await page.goto(url);
}


crawlerWeibo();