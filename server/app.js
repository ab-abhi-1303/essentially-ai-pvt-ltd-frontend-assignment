// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    try {
        const stockSymbol = req.body.stockSymbol;
        const date = req.body.date;
        const response = await axios.get(`https://api.polygon.io/v1/open-close/${stockSymbol}/${date}?adjusted=true&apiKey=vdCJkYhsvCWjyIAIdgsPXqwJGDW1o6py`);
        if (response.status === 200) {
            const { open, close, high, low, volume } = response.data;
            res.status(200).json({ open, close, high, low, volume });
        } else {
            console.log('Unknown response code:', response.status);
        }
    }
    catch (error) {
        if (error.response) {
            const statusCode = error.response.status;
            console.log('Error status code:', statusCode);
            if (statusCode === 404) {  //for Incorrect Symbol
                console.log('Resource not found.');
                res.sendStatus(404);
                return;
            }
            else if (statusCode === 403) { //for Incorrect Date
                console.log('Forbidden.');
                res.sendStatus(403);
                return;
            }
            else if (statusCode === 500) {
                console.log('Internal server error.');
                res.sendStatus(500);
                return;
            } else {
                console.log('Unknown error code:', statusCode);
            }
        } else if (error.request) {
            console.log('No response received.');
        } else {
            console.log('Error:', error.message);
        }
    }

});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));