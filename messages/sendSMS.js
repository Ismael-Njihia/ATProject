import AfricasTalking from "africastalking";
import dotenv from "dotenv";
dotenv.config();
const africastalking = AfricasTalking({
    apiKey: '1334221841e0824ffa9d9ac6532805a6cbb81666763dce35027d48bbcfeff8c5',
    username: 'sms001'
})


const sendSMS = (kenyanPhoneNumber, message) => {
    const sms = africastalking.SMS;
    const options = {
        to: kenyanPhoneNumber,
        message: `The current BTC/USD exchange rate is ${message}. Thank you for using our service`,
    }
    sms.send(options).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}
export default sendSMS;