const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    port: process.env.portDB,
    user: process.env.userDB,
    password: process.env.mysqlPassword,
    database: "app_facturas"    
});

db.connect((error) => {
    if (error) {
      console.error('❌ DB connection failed: ', error);
      throw error;
    }
    console.log('✅ DB connection successful');
});

module.exports = db;