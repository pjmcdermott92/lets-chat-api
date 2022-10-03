if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require('./socket');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./db');

connectDb();
const app = express();
app.server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true
}));

app.use('/v1', require('./routes'));

app.get('/', (req, res) => {
    res.send('Working')
});


socket(app.server);

app.use(errorHandler);

const PORT = process.env.PORT || 4200;
app.server.listen(PORT, () => console.log(`[app]: Server running on Port ${PORT}...`));
