// Creating express application
const express = require('express');
const app = express();

// Configuring express to use body-parser
// Allows to access data came from post request (req.body)
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Points the server to the website's files, no need for routing for these files
app.use(express.static('website'));

// Making the server
const port = 4000;
const server = app.listen(port, ()=>{
    console.log(`Server is running on localhost: ${port}`);
});



