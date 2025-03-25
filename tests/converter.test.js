const { currencyConverter } = require('../utils/converter');

// Verify that the currency converter function accurately converts the selected currency to the required conversion.
test('Convert 100 USD to PHP', () => {
  expect(currencyConverter('USD', 'PHP', 100)).toBe(5736);
});

// Verify that the currency converter function accurately converts the selected currency to the required conversion with a different amount.
test('Convert 50 USD to PHP', () => {
  expect(currencyConverter('USD', 'PHP', 50)).toBe(2868);
});
