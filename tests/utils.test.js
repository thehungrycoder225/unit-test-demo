

// Assertions
// The expect function is used every time you want to test a value.
// You will rarely call expect by itself.
// Instead, you will use a matcher function to assert something about a value.

// Common Matchers
// toBe uses Object.is to test exact equality.
// toEqual recursively checks every field of an object or array.
// You can also test the opposite of a matcher.
// For example, the code below tests that the two values are not equal:
// expect(a).not.toBe(b);

// Truthiness
// In tests, you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently.
// Jest contains helpers that let you be explicit about what you want.
// toBeNull matches only null
// toBeUndefined matches only undefined
// toBeDefined is the opposite of toBeUndefined
// toBeTruthy matches anything that an if statement treats as true
// toBeFalsy matches anything that an if statement treats as false

// Numbers
// Most ways of comparing numbers have matcher equivalents.
// For example, toBeGreaterThan and toBeLessThan check the value of a number.
// There are also some matcher that are specific to floating point numbers.
// For example, toBeCloseTo can be used to compare floating point numbers.

// Strings
// You can check strings against regular expressions with toMatch.
// For example, you can check that a string is formatted as a phone number.
// You can also check strings against strings with toContain.

// Arrays and iterables
// You can check if an array or iterable contains a particular item using toContain.
// For example, you can check that a particular value is in an array.

// Exceptions
// If you want to test that a particular function throws an error when it's called, use toThrow.
// For example, you can check that a function throws an error when it's called with incorrect arguments.

// Testing Asynchronous Code
// Jest allows you to write tests that work seamlessly with asynchronous code.
// There are two ways to handle asynchronous code in Jest tests.

// Callbacks
// The most common asynchronous pattern in JavaScript is callbacks.
// For example, you might make an AJAX request or use a setTimeout.
// In this case, your test will end before the callback is called.
// Jest needs to know when the callback is complete, and there are two ways to handle this.
// The first is to use the done argument in your test.
// For example, you might have a function like this:
// function fetchData(callback) {
//     setTimeout(() => {
//         callback('peanut butter');
//     }, 1000);
// }


// Types of Assertions
// describe
// test
// expect
// .toBe()
// .toEqual()
// .not.toBe()
// .toBeNull()
// .toBeUndefined()
// .toBeDefined()
// .toBeTruthy()
// .toBeFalsy()
// .toBeGreaterThan()



const { sum, registerUser } = require('../utils/utils');

// fail test
// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(4);
// });

// pass test
// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });


//  test for registerUser

test('registerUser should throw an error if email is invalid', () => {
    expect(() => {
        registerUser('test.com', 'password', 'username');
    }).toThrow('Invalid email!');
});

test('registerUser should throw an error if password is too short', () => {
    expect(() => {
        registerUser('test@email.com,', 'pass', 'username');
    }
    ).toThrow('Password is too short!');
}
);

test('registerUser should throw an error if username is too short', () => {
    expect(() => {
        registerUser('test@email.com,', 'password', 'us');
    }
    ).toThrow('Username is too short!');
}
);


test('registerUser should return an object with email, username and password', () => {
    expect(registerUser('test@email.com', 'password', 'username')).toEqual({
        email: '',
        username: '',
        password: '',
    });
}
);
