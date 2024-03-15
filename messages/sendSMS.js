import AfricasTalking from "africastalking";
import dotenv from "dotenv";
dotenv.config();
const africastalking = AfricasTalking({
    apiKey: '',
    username: ''
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