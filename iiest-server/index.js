const express = require('express');
const app = express();
const dotenv  = require('dotenv');
const cors = require('cors');
const connectToMongo = require('./config/db.js');

dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use('/iiest/staff', require('./routers/staffRoute.js'));
app.use('/iiest/fbo', require('./routers/fboRoute.js'));

connectToMongo();

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})