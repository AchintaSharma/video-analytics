const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudDB = require('./clickhouseQuery');

const app = express();

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ info: 'Welcome to Clickhouse API for data fetch' })
});

app.get('/data/:id', cloudDB.getDataById)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})