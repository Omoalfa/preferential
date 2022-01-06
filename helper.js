const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const generateToken = (_id, username) => jwt.sign({_id, username}, JWT_SECRET, { expiresIn: '2h' });

const verify = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
    generateToken,
    verify,
}
