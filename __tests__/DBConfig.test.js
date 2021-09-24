const dbConfig = require("../config/DBconfig.js")

describe('Database configuration tester', () => {
    
    test('should migrate to the test enviroment database configurations', () => {
        console.log(dbConfig);

        // console.log(process.env.NODE_ENV=="test"? dbConfig.TEST_DB : dbConfig.DB);
        // console.log("Environment :", process.env.NODE_ENV);

        expect(dbConfig).toStrictEqual({"DB": "artdb_test", "HOST": "localhost", "PASSWORD": "arroot", "USER": "root"})
    })
    
})
