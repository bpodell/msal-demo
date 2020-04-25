const express = require('express');
const morgan = require('morgan');
const path = require('path');

//initialize express.
const app = express();

// Initialize variables.
const port = 3000; // process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Set the front-end folder to serve public assets.
app.use(express.static('app'))

// Set up a route for index.html.
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the server.
app.listen(port);
console.log('Listening on port ' + port + '...');

// http://localhost:3000/callback#error=redirect_uri_mismatch&error_description=AADB2C90006%3a+The+redirect+URI+%27http%3a%2f%2flocalhost%3a4200%2fcallback%27+provided+in+the+request+is+not+registered+for+the+client+id+%27366be840-dd34-4fee-8650-3acc60eb6d7d%27.%0d%0aCorrelation+ID%3a+447ce08a-28f5-442c-8217-e3fd10e44f74%0d%0aTimestamp%3a+2020-04-25+17%3a09%3a08Z%0d%0a&state=d4efe0eb-7e37-40d4-8146-fcaf80a2bda1