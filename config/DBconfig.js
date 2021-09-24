require('dotenv').config();

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USR,
    PASSWORD: process.env.PASSWORD,
    DB:  process.env.NODE_ENV=='test'? process.env.TEST_DB:process.env.DB,
};


