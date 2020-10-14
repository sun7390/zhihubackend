import puppeteer from 'puppeteer';

const userName = '李荣浩';
const cookieStr = "_s_tentry=-; Apache=4878003016766.173.1602672166125; SINAGLOBAL=4878003016766.173.1602672166125; ULV=1602672166130:1:1:1:4878003016766.173.1602672166125:; WBStorage=70753a84f86f85ff|undefined; login_sid_t=dd284d0c238ea3f77f1ea8bc9fadd721; cross_origin_proto=SSL; WBtopGlobal_register_version=2020101418; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Whduy0DzFpqD35hZkbuuNkv5JpX5KzhUgL.Fo-XSKnEe0z7ShB2dJLoIcQLxK-LBK-LBKzLxKBLB.-L1hnLxK-L1KeL1h2LxK-L12-L1-qLxK-L12BL1K-LxK-L12eL1h-LxK-L12eL1h-LxK.LBK-LBo5LxK-L1KeL1h2LxKqL1h.L12zLxKnLBK2LBKyRqcj7S05N; SUHB=0WGcg9MkWXcDKY; ALF=1634208289; SSOLoginState=1602672290";
const url = `https://s.weibo.com/user?q=${encodeURIComponent(userName)}&Refer=index`;
const visitUrl = async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ 'Cookie': cookieStr })
    await page.goto(url);
    const nameList = await page.$$eval('.name', e => e.map(item => item.textContent));
    const imgList = await page.$$eval('.avator > a > img', e => e.map(item => item.src));
    const hrefList = await page.$$eval('.avator > a', e => e.map(item => item.href));
    console.log(hrefList);
    await browser.close();
}
visitUrl()