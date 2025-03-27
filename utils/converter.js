const exchangeRates = {
  USD: { INR: 74.5, EUR: 0.85, PHP: 57.37 },
  INR: { USD: 0.013 },
  EUR: { USD: 1.18 },
  PHP: { USD: 0.017 },
};

exports.currencyConverter = (fromSymbol, toSymbol, amount) => {
  if (amount === null || amount === undefined || typeof amount !== 'number') {
    return 'Error: Invalid input';
  }

  const rate = exchangeRates[fromSymbol]?.[toSymbol];
  if (!rate) {
    throw new Error('Invalid Currency Code or Conversion Rate not available.');
  }

  return amount * rate;
};
