import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: true });

    async function test(app, loc) {
        const context = await browser.newContext();
        const page = await context.newPage();
        const query = encodeURIComponent(`does ${app} deliver or operate in ${loc}?`);
        await page.goto(`https://www.bing.com/search?q=${query}`, { waitUntil: 'domcontentloaded' });
        const textContent = await page.evaluate(() => document.body.innerText.toLowerCase());
        console.log(`\n--- RESULT FOR ${app} in ${loc} ---`);
        console.log(textContent.substring(0, 500));
        await context.close();
    }

    await test('EatSure', '641045');
    await test('Zomato', '641045');

    await browser.close();
})();
