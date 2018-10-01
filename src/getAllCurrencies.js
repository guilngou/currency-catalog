export const getAllCurrenciesMethod = async () => {
  try {
    const query = await fetch(
      "https://api.coinmarketcap.com/v2/ticker/?limit=200"
    );
    return await query.json();
  } catch (error) {
    throw error;
  }
};
