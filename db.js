const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'varsha@132006KV',
  database: 'college_events'
});

db.connect((err) => {
  if (err) {
    console.log('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database!');
  }
});

module.exports = db;