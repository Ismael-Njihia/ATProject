import AfricasTalking from "africastalking";
import dotenv from "dotenv";
dotenv.config();
const africastalking = AfricasTalking({
  apiKey: process.env.API_KEY,
  username: process.env.USERNAME,
});
console.log(process.env.API_KEY);
console.log(process.env.USERNAME);

const sendSMS = (PhoneNumber, rate) => {
  const sms = africastalking.SMS;
  const options = {
    to: PhoneNumber,
    message: `The current BTC/USD exchange rate is ${rate}. Thank you for using our service`,
  };
  sms
    .send(options)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default sendSMS;
