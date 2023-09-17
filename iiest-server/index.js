const express = require('express');
const app = express();
const dotenv  = require('dotenv');
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use('/auth', require('./router/auth.js'));

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})