const express = require('express');
const songRoutes = require('./routes/song.routes')
const cors = require('cors')


const app = express();

app.use(cors());

const options = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(express.json())


app.use('/', songRoutes);



module.exports = app;