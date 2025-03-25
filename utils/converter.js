const exchangeRates = {
  USD: { INR: 74.5, EUR: 0.85, PHP: 57.37 },
  INR: { USD: 0.013 },
  EUR: { USD: 1.18 },
  PHP: { USD: 0.017 },
};

exports.currencyConverter = (fromSymbol, toSymbol, amount) => {
  const fromRates = exchangeRates[fromSymbol];
  if (!fromRates || !fromRates[toSymbol]) {
    throw new Error(
      `Error: Conversion rate from ${fromSymbol} to ${toSymbol} not found.`
    );
  }

  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Error: Invalid input');
  }

  const rate = fromRates[toSymbol];
  return amount * rate;
};
