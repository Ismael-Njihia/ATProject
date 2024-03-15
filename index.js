import express from 'express';
import usdExchangeRate from './util/usdExchangeRate.js';
import sendSMS from './messages/sendSMS.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let collectingPhoneNumber = false; // State to track phone number collection
let userPhoneNumber = ''; // Variable to store the phone number

app.post('/ussd', (req, res) => {
    const { text, phoneNumber} = req.body;
    let response = '';

    if (text === '') {
        response = `CON Welcome to USSD Exchange Rate Service.
        1. Get Current NSE Stock Prices
        2. Crypto Currency Prices
        3. Currency Exchange Rates
        4. Set up a price alert
        5. Get a list of stocks`;
    }else if(text === '1'){
        response = 'END You selected option 1';
    }else if (text === '2') {
        
        usdExchangeRate().then(rate => {
            sendSMS(phoneNumber, rate);
        }).then(() => {
            console.log('SMS sent');
        }).catch(error => {
            console.error('Error:', error);
        });
        response = `END You will receive a SMS message on number ${phoneNumber} with the BTC/USD exchange rate`;

    }else if (text === '3') {
        response = 'END You selected option 3';
    }else if (text === '4') {
        response = 'CON Enter the amount you want to set an alert for';
    }else if (text === '5') {
        response = 'END You selected option 5';
    }

    // Send the response back to the API
    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});