import AfricasTalking from "africastalking";
import dotenv from "dotenv";
dotenv.config();
const africastalking = AfricasTalking({
  apiKey: process.env.API_KEY,
  username: 'sms001',
});
console.log(process.env.API_KEY);
console.log(process.env.USERNAME);

const sendSMS = (PhoneNumber, rate) => {
  const sms = africastalking.SMS;
  const options = {
    to: PhoneNumber,
    message: rate,
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
