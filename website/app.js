// My pesonal API key from OpenWeatherMap
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const myKey = '&appid=a6f3b167179f9fc0f6df48e8d302e82e&units=imperial';


const generateBtn = document.querySelector('#generate');

generateBtn.addEventListener('click', () => {

    const { feeling, zip } = getUserData();
    // The actual url
    const theUrl = weatherUrl + zip + myKey;

    getApiData(theUrl)
        .then((data) => {
            let returnedData = { name: data.name, temp: data.main.temp, description: data.weather[0].description, icon: data.weather[0].icon };
            return returnedData;
        })
        .then((weatherData) => sendDataToTheServer({ weatherData, feeling }))
        .then(() => updatetheUI())
        .catch((error) => console.log('from event', error));
});

function getUserData() {
    const feeling = document.querySelector('#feelings').value;
    const zip = document.querySelector('#zip').value;
    return { feeling, zip };
}

function getApiData(theUrl) {
    return fetch(theUrl)
        .then((response) => {
            if (!response.ok) {
                alert('You should write valid zip') // alret in case user typed wrong zip or let value of zip empty
            }

            return response.json();
        })

        //return { name: data.name, temp: data.main.temp, description: data.weather[0].description, icon: data.weather[0].icon };


        .catch(error => { console.log('error', error) }); // rejected in case of network error
}

function sendDataToTheServer(data) {
    const options = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data),
    };
    return fetch('/datafromuserandapi', options)
        .then((response) => {
            return response.json()
        })
        .catch(error => { console.log('error..........', error) });

}

function updatetheUI() {

    let date = new Date();
    return fetch('/all')
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            document.querySelector('#temp').innerHTML = Math.round(data.temp) + '&deg;';
            document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
            document.querySelector('#country').innerHTML = data.name;
            document.querySelector('#description').innerHTML = data.description;
            document.querySelector('#date').innerHTML = (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear(); //getMonth: months starts from 0
            document.querySelector('#content').innerHTML = data.feeling;
        });
}
/**
 1- API Credentials
 2- get data from the user
 3- get data from the api using data entered from the user
 4- send data to the server
 5- send data back to the clint
 6- updating the ui
 */

