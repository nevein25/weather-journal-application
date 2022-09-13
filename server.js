// The app API endpoint
const projectData = {};

// Creating express application
// require in case of express returns a function
const express = require('express');
const app = express();

// Configuring express to use body-parser
// Allows to access data that came from post request (req.body) and parses it as json
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Cors for cross origin allowance
const cors = require('cors');
// enables all cors requests
app.use(cors());

// Points the server to the website's files, no need for routing for these files
app.use(express.static('website'));

// Starting up the server to listen on specificspecific specific port  
const port = 4000;
const server = app.listen(port, ()=>{
    console.log(`Server is running on localhost: ${port}`);
});

let allData = []
app.post('/datafromuserandapi', (req, res) => {
    console.log('I got request');
    let comingData = {
        name: req.body.weatherData.name,
        temp: req.body.weatherData.temp,
        description: req.body.weatherData.description,
        icon: req.body.weatherData.icon,
        feeling: req.body.feeling
    }
    console.log(comingData);
    allData.unshift(comingData);
    // console.log(req.body);
    // console.log('w', req.body.weatherData.name);
    // console.log('f',req.body.feeling);
});


