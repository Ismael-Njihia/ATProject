export function searchStockByCode(stockData, code) {
  const stock = stockData.find((stock) => stock.Code === code);
  if (stock) {
    return stock;
  } else {
    return null;
  }
}
