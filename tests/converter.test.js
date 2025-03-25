const { currencyConverter } = require('../utils/converter');

// Verify that the currency converter function accurately converts the selected currency to the required conversion.
test('Convert 100 USD to PHP', () => {
  expect(currencyConverter('USD', 'PHP', 100)).toBe(5737.0);
});

test('Convert 100 USD to PHP', () => {
  expect(currencyConverter('USD', 'PHP', 100)).not.toBe(5737.1);
});

test('Convert 500 USD to PHP', () => {
  expect(currencyConverter('USD', 'PHP', 500)).toBe(28685.0);
});

test('Invalid input type and throw error', () => {
  expect(() => currencyConverter('USD', 'PHP', 'invalid')).toThrowError(
    'Error: Invalid input'
  );
});

test('Invalid Currency Symbol', () => {
  expect(() => currencyConverter('USD', 'PH', 100)).toThrowError(
    'Error: Conversion rate from USD to PH not found.'
  );
});
