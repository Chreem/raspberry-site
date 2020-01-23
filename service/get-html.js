const puppeteer = require('puppeteer');

module.exports = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const dimensions = await page.evaluate(() => {
        return {
            getTimelineService: window.getTimelineService,
            getStatisticsService: window.getStatisticsService
        };
    });
    await browser.close();
    return dimensions;
}