const { currencyConverter } = require('../utils/converter');

// Test if the currency converter converts the currency correctly
// test('Converts currency correctly', () => {
//   expect(currencyConverter('USD', 'PHP', 100)).not.toBe(5738.5);
// });

// test('Converts currency with a different amount correctly', () => {
//   expect(currencyConverter('USD', 'PHP', 500)).toBe(28685.0);
// });

// test('Verify if the currency converter returns an error if the currency is not supported', () => {
//   expect(() => currencyConverter('USD', 'XYZ', 100)).toThrow(
//     'Invalid Currency Code or Conversion Rate not available.'
//   );
// });

// test('Verify it the currency converter handles a non number input', () => {
//   expect(currencyConverter('USD', 'PHP', '100')).toBe('Error: Invalid input');
// });

// test('Verify if the currency converter handles a null input', () => {
//   expect(currencyConverter('USD', 'PHP', null)).toBe('Error: Invalid input');
// });
