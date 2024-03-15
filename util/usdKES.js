import converter from "currency-exchanger-js";
const convertUSDToKES = async () => {
  try {
    const rate = await convertUSDToKES(1);
    const usdToKesRate = await converter.convert(rate, "USD", "KES");
    return usdToKesRate;
  } catch (error) {
    console.error("Error:", error);
  }
  rate;
};
export default convertUSDToKES;
