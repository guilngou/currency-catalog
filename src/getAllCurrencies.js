export const getAllCurrenciesMethod = async () => {
  try {
    const query = await fetch(
      "https://api.coinmarketcap.com/v2/ticker/?limit=100"
    );
    return await query.json();
  } catch (error) {
    throw error;
  }
};
