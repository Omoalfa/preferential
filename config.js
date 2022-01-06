const env = require('dotenv');

env.config()

module.exports = {
    PORT: process.env.PORT || 8080,
    DB_URI: process.env.DB_URI || 'localhost',
    JWT_SECRET: process.env.JWT_SECRET || 'DOENOINGRNBFDIO3OI'
}
