import ccxt from "ccxt";

const usdExchangeRate = async () => {
  try {
    const exchange = new ccxt.binance(); // You can change this to any other exchange that supports the pair
    const ticker = await exchange.fetchTicker("BTC/USD"); // Change the pair to USD/KES
    const rate = ticker.last;
    const price = await convertUSDToKES(rate);
    return price;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default usdExchangeRate;

const convertUSDToKES = async (price) => {
  const rates = await fetch("https://cdn.moneyconvert.net/api/latest.json");
  return price * rates.rates.KES;
};
