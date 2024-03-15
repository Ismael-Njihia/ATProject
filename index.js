import express from 'express';
import usdExchangeRate from './util/usdExchangeRate.js';
import sendSMS from './messages/sendSMS.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let collectingPhoneNumber = false; // State to track phone number collection
let userPhoneNumber = ''; // Variable to store the phone number

app.post('/ussd', (req, res) => {
    const { text } = req.body;
    let response = '';

    if (!collectingPhoneNumber) {
        // Initial prompt
        response = `CON Welcome to the Stock Prices\n
        1. Get Current NSE Stock Prices
        2. Cyprto Currenct Prices;
        3. Currency Exchange Rates
        4. Set up a price alert`;
    } else {
        // User entered phone number
        userPhoneNumber = text;
        const digitsOnly = userPhoneNumber.replace(/\D/g, ''); 
        const cleanedPhoneNumber = digitsOnly.slice(2);
        const kenyanPhoneNumber = `+254${cleanedPhoneNumber}`;
       
        collectingPhoneNumber = false; 
       
        response = `END You will receive a SMS message on number ${kenyanPhoneNumber} with the stock prices`;
         usdExchangeRate().then((rate) => {
            sendSMS(kenyanPhoneNumber, rate);
            console.log('BTC/USD:', rate);
        }).catch((error) => {
            console.error('Error:', error);
        });
       
    }

    // Check if user is entering phone number
    if (text === '1') {
        collectingPhoneNumber = true;
        response = `CON Please enter your phone number (e.g., 0741727406):`;
    } else if (text === '2') {
        collectingPhoneNumber = true;
        response = `CON Please enter your phone number (e.g., 0741727406):`;
    }

    // Send the response back to the API
    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});