import AfricasTalking from "africastalking";
import dotenv from "dotenv";
dotenv.config();
const africastalking = AfricasTalking({
<<<<<<< HEAD
    apiKey: '',
    username: ''
})


const sendSMS = (PhoneNumber, rate) => {
    const sms = africastalking.SMS;
    const options = {
        to: PhoneNumber,
        message: `The current BTC/USD exchange rate is ${rate}. Thank you for using our service`,
    }
    sms.send(options).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}
export default sendSMS;
=======
>>>>>>> 7ac70cd118367b5147b5c90f9394d72db3b2e68e
