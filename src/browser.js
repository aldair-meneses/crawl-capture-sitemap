const puppeteer = require('puppeteer');
const path = require('path');
const settings = require('./settings.js');
const pagesUrls = require('./navigation/pagesManager.js');
const { timeout } = require('puppeteer');

const { launcherOptions, gotoOptions, cookies } = settings;

const screenshotDir  = path.join(__dirname, '../screenshots');

exports.crawler = {
    run: async () => {
        const browser = await puppeteer.launch(
            launcherOptions,
        );

        let usingCookies = false;
        
        console.table(pagesUrls);
        
        for ( url of pagesUrls) {
            const page = await browser.newPage();
            console.table([{ "Página": url }]);
                        
            if (cookies.length > 0 && !usingCookies) {
                const domain = "https://" + new URL(url).hostname;
                await page.setCookie(...cookies);
                await page.goto(domain, gotoOptions );
                await page.reload();
                usingCookies = true;
            }

            await page.goto(url, gotoOptions );
            
            const slug  = await page.evaluate(() => {
                if (window.location.pathname === '/') {
                    return window.location.hostname;
                }
                return window.location.pathname.replaceAll('/', '-');
            });

            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
            await page.setViewport({ width: bodyWidth, height: bodyHeight });
            
            await page.screenshot({ path: `${screenshotDir}/${slug}.png` }, { fullPage: true });
        }

        browser.close();
    }
}