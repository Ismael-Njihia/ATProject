import ccxt from "ccxt";

const usdExchangeRate = async () => {
  try {
    const exchange = new ccxt.binance(); // You can change this to any other exchange that supports the pair
    const ticker = await exchange.fetchTicker("BTC/USD"); // Change the pair to USD/KES
    const rate = ticker.last;
    return rate;
  
  } catch (error) {
    console.error("Error:", error);
  }
};

export default usdExchangeRate;

export const convertUSDToKES = async (price) => {
  const rates = await fetch("https://cdn.moneyconvert.net/api/latest.json");
  return price * 134.5;
};
