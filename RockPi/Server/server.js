const {Pool} = require('pg')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000;

require('dotenv').config({ path: './db.env' });

app.use(cors());
app.use(express.json());

const pool = new Pool({
	user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/api/data/:tableName', async (req, res) => {
    const { tableName } = req.params;
	const client = await pool.connect();
	try {
	  const result = await client.query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1;`);
	  res.json(result.rows);
	} catch (err) {
	  console.error(err.message);
	  res.sendStatus(500);
	} finally {
	  client.release();
	}
});

app.post('/esp32-data', async (req, res) => {
	try {
	  const { count } = req.body.sensorData;
  
	  await pool.query('INSERT INTO bergsbrunna (count) VALUES ($1)', [count]);
  
	  res.status(200).send('Data received and stored successfully');
	  
	} catch (error) {
	  console.error('Error:', error);
	  res.status(500).send('Error processing data');
	}
  });

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });