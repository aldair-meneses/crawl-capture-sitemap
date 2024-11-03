const puppeteer = require('puppeteer');
const path = require('path');
const settings = require('./settings.js');
const pagesUrls = require('./navigation/pagesManager.js');

const { launcherOptions, gotoOptions } = settings;

const screenshotDir  = path.join(__dirname, '../screenshots');

exports.crawler = {
    run: async () => {
        const browser = await puppeteer.launch(
            launcherOptions,
        );
    
        console.log('pagesUrl', pagesUrls);

        await Promise.all(pagesUrls.map(async (url) => { 
            const page = await browser.newPage();
            await page.goto(url, gotoOptions );
            
            const slug  = await page.evaluate(() => {
                if (window.location.pathname === '/') {
                    return window.location.hostname;
                }
                return window.location.pathname;
            });

            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
            await page.setViewport({ width: bodyWidth, height: bodyHeight });

            await page.screenshot({ path: `${screenshotDir}/${slug}.png` }, { fullPage: true });
         }));

        browser.close();
    }
}