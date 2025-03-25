exports.currencyConverter = (fromSymbol, toSymbol, amount) => {
  const rate = [
    {
      from: 'USD',
      to: 'INR',
      rate: 74.5,
    },
    {
      from: 'INR',
      to: 'USD',
      rate: 0.013,
    },
    {
      from: 'USD',
      to: 'EUR',
      rate: 0.85,
    },
    {
      from: 'EUR',
      to: 'USD',
    },
    {
      from: 'USD',
      to: 'PHP',
      rate: 57.36,
    },
    {
      from: 'PHP',
      to: 'USD',
      rate: 0.017,
    },
  ].find((r) => r.from === fromSymbol && r.to === toSymbol).rate;
  return amount * rate;
};
