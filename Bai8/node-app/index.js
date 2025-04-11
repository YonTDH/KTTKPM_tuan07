const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Dùng biến môi trường để config
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Kết nối MySQL thất bại:', err);
    return;
  }
  console.log('✅ Đã kết nối MySQL thành công!');
});

app.get('/', (req, res) => {
  connection.query('SELECT NOW() AS now', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(`MySQL time: ${results[0].now}`);
  });
});

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
