import AfricasTalking from "africastalking";
import dotenv from "dotenv";
dotenv.config();
const africastalking = AfricasTalking({
    apiKey: '2ae33f70eb2ff5bc7d43b6a47a231f70269be904ed325738f2a9e4e0930d770f',
    username: 'AfricaStoccks'
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