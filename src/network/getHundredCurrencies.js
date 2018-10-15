export const getHundredCurrencies = async () => {
  const response = await fetch(
    'https://api.coinmarketcap.com/v2/ticker/?limit=100'
  );
  return await response.json();
};
