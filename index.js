import express from 'express';
import usdExchangeRate from './util/usdExchangeRate.js';
import sendSMS from './messages/sendSMS.js';
import { promises as fs } from 'fs';
import convertUSDToKES from './util/usdKES.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function getScrapedStockData() {
    try {
       const data = await fs.readFile('scrapedData.json', 'utf8');
       const scrapedData = JSON.parse(data);
       return scrapedData;
    } catch (error) {
       console.error('Error reading scraped data:', error);
       return []; 
    }
}

app.post('/ussd', async (req, res) => {
    const { text, phoneNumber} = req.body;
    let response = '';

    if (text === '') {
        response = `CON Welcome to USSD Exchange Rate Service.
        1. Get Current NSE Stock Prices
        2. BTC price
        3. Currenct USD/KES Exchange Rate
        4. Set up a price alert
        5. Search for Stocks  (eg., EGAD)
        `;
    }else if(text === '1'){
const stockData = await getScrapedStockData();
// Sort the stock data by price in descending order
stockData.sort((a, b) => b.price - a.price);
// Take only the top 5 items
const top5Stocks = stockData.slice(0, 5);
// Format the top 5 stock data into a string suitable for SMS
const stockList = top5Stocks.map((stock, index) => {
    // Check if the change is negative
    const changePercentageDisplay = stock.Change_Percentage < '-%' ? "0%" : `${stock.Change_Percentage}`;

    return `${index + 1}. ${stock.Code}: Price: ${stock.Price}, Previous: ${stock.Previous}, Change Percentage: ${changePercentageDisplay}`;
}).join('\n');

response += `Con Here are top 5 Stocks\n${stockList}`;

// response += 'Con 98 More\n';
// response += 'Con 99 Back\n';
// response += 'Con 0 Search Stocks by Code (eg., EGAD)\n';
response = `END Here are top 5 Stocks\n${stockList}`;

sendSMS(phoneNumber, stockList);
    }else if (text === '2') {
        
        usdExchangeRate().then(rate => {
            sendSMS(phoneNumber, `The current BTC/USD exchange rate is ${rate}`);
        }).then(() => {
            console.log('SMS sent');
        }).catch(error => {
            console.error('Error:', error);
        });
        response = `END You will receive a SMS message on number ${phoneNumber} with the BTC/USD exchange rate`;

    }else if (text === '3') {
        convertUSDToKES().then(rate => {
            sendSMS(phoneNumber, `The current USD/KES exchange rate is ${rate}`);
        })
        
        response = 'END You will receive a SMS message with the current USD/KES exchange rate';
    }else if (text === '4') {
        response = 'CON Enter the amount you want to set an alert for';
    }else if (text =='5'){
        response ='CON enter the stock you are looking for';
        const searchResults = await searchStockByCode(stockData, )
        console.log(text)

    }

    // Send the response back to the API
    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});