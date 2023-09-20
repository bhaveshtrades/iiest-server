const express = require('express');
const app = express();
const dotenv  = require('dotenv');
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use('/iiest/staff', require('./routers/staffAuth.js'));
app.use('/iiest/fbo', require('./routers/fboAuth.js'));

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})