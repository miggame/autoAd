const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iphone6 = devices['iPhone 6'];
let totalCount = 0;
let showCount = 0;
async function openGame() {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
        // timeout: 600000
    });
    const page = await browser.newPage();
    await page.emulate(iphone6);
    await totalCount++;
    await console.log('总请求次数: ', totalCount);
    await page.goto('https://miggame.github.io/game/bbt/index.html', {
        timeout: 300000
    }).catch((err) => {
        console.log('错误1');
        console.log('err');
        browser.close();
        openGame();
    });
    const videoCloseSelector = 'body > div:nth-child(8) > div:nth-child(3)';
    await page.waitForSelector(videoCloseSelector, {
        visible: true,
        timeout: 300000
    }).catch((err) => {
        console.log('错误2');
        console.log('err');
        browser.close();
        openGame();
    });
    await page.waitFor(20000);
    await page.click(videoCloseSelector);
    await page.waitFor(10000);
    await showCount++;
    await console.log('广告展示次数: ', showCount);
    await browser.close();
    await openGame();
}

openGame();