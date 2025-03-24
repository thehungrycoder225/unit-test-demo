// exports.sum = function (a, b) {
//     return a + b;
// };


// exports.diff = function (a, b) {
//     return a - b;
// };


// registers a user with valid email & password

exports.registerUser = function (email, password, username) {
    if (!email.includes('@')) {
        throw new Error('Invalid email!');
    } else if (password.length < 8) {
        throw new Error('Password is too short!');
    } else if (username.length < 3) {
        throw new Error('Username is too short!');
    } else {
        return { email, username, password };
    }
}

