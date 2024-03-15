const puppeteer = require('puppeteer');

(async () => {
  const yesterdayDate = '20230718'; // Assuming this date is correct
  const scrapedData = [];

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto('https://live.mystocks.co.ke/login/', { waitUntil: 'networkidle0' });

    // Login
    await page.type('#lp_usr', 'wanjikumary5370@gmail.com');
    await page.type('#lp_pwd', 'mary5370');
    await page.click('#loginBtn2');

    await page.waitForNavigation();

    // Go to the price list page for the given date
    const targetUrl = `https://live.mystocks.co.ke/login/?pg=%2Fprice_list%2F${yesterdayDate}`;
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });

    // Scrape data from the table
    const scrapedData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('#pricelist tr'));
      const data = [];

      for (const row of rows.slice(3)) {
        const cells = row.querySelectorAll('td');

        if (cells.length >= 12) {
          const [code, , low12Months, high12Months, lowDaysTrading, highDaysTrading, price, previous, change, changePer, changeSmbol, volume, adjustedPrice] = cells;
          data.push({
            code: code.textContent.trim(),
            low_12_months: low12Months.textContent.trim(),
            high_12_months: high12Months.textContent.trim(),
            low_days_trading: lowDaysTrading.textContent.trim(),
            high_days_trading: highDaysTrading.textContent.trim(),
            price: price.textContent.trim(),
            previous: previous.textContent.trim(),
            change: change.textContent.trim(),
            change_per: changePer.textContent.trim(),
            change_smbol: changeSmbol.textContent.trim(),
            volume: volume.textContent.trim(),
            adjusted_price: adjustedPrice.textContent.trim(),
          });
        }
      }
      return data;
    });

    console.log('Scraped data:', scrapedData);

    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
