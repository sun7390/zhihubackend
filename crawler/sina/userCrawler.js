import puppeteer from 'puppeteer';
import { cookie } from './constants/cookie.js';
import { sleep } from './utils/sleep.js';
import { qsParse } from './utils/qs.js';
import log4js from 'log4js';
import fs from 'fs';
import Path from 'path';

const logger = log4js.getLogger("weibo");
logger.level = 'debug';
const args = process.argv;
const url = args[2];
const keyWord = args[3];
logger.info(url);

const dataRoot = Path.resolve('./analysisData');

function mkdirSync(dir, cb) {
    let paths = dir.split('/');
    let index = 1;

    function next(index) {
        //递归结束判断
        if (index > paths.length) return cb();
        let newPath = paths.slice(0, index).join('/');
        const path = Path.join(dataRoot, newPath);
        fs.access(path, function(err) {
            if (err) { //如果文件不存在，就创建这个文件
                fs.mkdir(path, function(err) {
                    next(index + 1);
                });
            } else {
                //如果这个文件已经存在，就进入下一个循环
                next(index + 1);
            }
        })
    }
    next(index);
}

(async function() {
    // 创建页面
    const createNewPage = async(url) => {
        const page = await browser.newPage();
        await page.setCookie(...cookie);
        await page.goto(url);
        await page
            .mainFrame()
            .addScriptTag({
                url: 'https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js'
            })
        return page;
    };

    const browser = await puppeteer.launch({ headless: false });
    const page = await createNewPage(url);
    const index = url.lastIndexOf('/');
    const nickName = url.slice(index + 1);

    // 所有微博内容
    let parseContent = '';

    const isNotUndef = (content) => Object.prototype.toString.call(content) !== "[object Undefined]";

    const crawlerWeibo = async() => {
        const pageCount = await getTotalPage();
        logger.info('page count:', pageCount);
        let currentPage = 1;
        while (currentPage <= pageCount) {
            console.log(`开始抓取第${currentPage}页`);
            await getWeiboContent(currentPage);
            console.log(`第${currentPage}页抓取完成`);
            currentPage++;
            await gotoNextPage(currentPage);
        }
        const relatePath = `/${keyWord}/original.txt`;
        const writePath = `./crawler/sina/analysisData${relatePath}`;
        mkdirSync(relatePath, () => {
            fs.writeFileSync(writePath, parseContent, 'utf8');
            process.send({ message: 'done' });
        })
        await page.close();
    }

    // 跳转下一页
    const gotoNextPage = async(pageNum) => {
        await page.goto("https://weibo.com/" + nickName + "?is_search=0&visible=0&is_ori=1&is_tag=0&profile_ftype=1&page=" + pageNum + "#feedtop");
        await page.addScriptTag({
            url: "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"
        });
    }

// 滚动直到出现分页
const scrollToPageBar = async() => {
    let pageBar = await page.$('div[node-type=feed_list_page]');
    while (!pageBar) {
        await page.evaluate((scrollStep) => {
            let scrollTop = document.scrollingElement.scrollTop;
            document.scrollingElement.scrollTop = scrollStep + scrollTop;
        }, 1500);
        await sleep(1500);
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
    const getWeiboContent = async(curPage) => {
        if (curPage !== 1) {
            await scrollToPageBar();
        };
        // 获取微博个数
        const count = await page.evaluate(() => {
            return $("div[action-type=feed_list_item]").length;
        });
        logger.info('weibo count', count);
        let waitForUrls = [];
        let weiboes = await page.$$("div[action-type=feed_list_item]");
        let wc = await Promise.all(weiboes.map(async(weibo, index) => {
            const weiboContent = await page.evaluate((weibo) => $.trim($(weibo).find("div[node-type=feed_list_content]").text()), weibo);
            const repostHref = await page.evaluate((weibo) => $(weibo).find(".WB_feed_expand  [node-type=feed_list_item_date]").attr("href"), weibo);
            if (repostHref) {
                logger.info(repostHref)
                waitForUrls.push(`https://weibo.com${repostHref}`);
            }
            let content;
            if (weiboContent.includes('展开全文')) {
                //const element = await page.$$(".WB_detail > .WB_from > a[node-type=feed_list_item_date]");
                const href = await page.evaluate((weibo) => $(weibo).find("[node-type=feed_list_item_date]").attr("href"), weibo);
                waitForUrls.push(`https://weibo.com${href}`);
                return {};
            } else {
                content = weiboContent;
            }
            return {
                content,
                // weiboId: $.trim($(weibo).attr("mid")),
                // create_time: $.trim($(weibo).find("[node-type=feed_list_item_date]").attr("title")),
                // weibo_url: $(weibo).find("[node-type=feed_list_item_date]").attr("href"),
                // repost_num: $(weibo).find("[action-type=fl_forward] em:eq(1)").text()
            }
        }));
        for (const url of waitForUrls) {
            try {
                const newPage = await createNewPage(url);
                await newPage.waitForTimeout(1000);
                const content = await newPage.evaluate(() => document.querySelectorAll('div[node-type="feed_list_content"]')[0].innerText);
                logger.info('extra:', content)
                wc.push({
                    content
                });
                await newPage.close();
            } catch (e) {
                logger.warn('err:', e);
            }
        }
        for (const we of wc) {
            if (isNotUndef(we.content)) {
                parseContent += (we.content + '\n')
            }
        }
        console.log(parseContent);
    }
    crawlerWeibo();
})();