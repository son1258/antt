const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Thiết lập kết nối tới cơ sở dữ liệu
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'yourdatabase'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// API để lưu trữ mã PIN đã mã hóa
app.post('/api/encrypt', (req, res) => {
  const { user_id, encrypted_pin } = req.body;
  const sql = 'INSERT INTO encrypted_pins (user_id, encrypted_pin) VALUES (?, ?)';
  db.query(sql, [user_id, encrypted_pin], (err, result) => {
    if (err) throw err;
    res.send('Mã PIN đã mã hóa đã được lưu trữ');
  });
});

// API để lấy mã PIN đã mã hóa
app.get('/api/encrypt/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const sql = 'SELECT * FROM encrypted_pins WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
