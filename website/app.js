/* the actual url: weatherUrl+zip+myKey*/

// My pesonal API key from OpenWeatherMap
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const myKey = '&appid=a6f3b167179f9fc0f6df48e8d302e82e&units=imperial';
const generateBtn = document.querySelector('#generate');

generateBtn.addEventListener('click', () => {

    const { feeling, zip } = getUserData();
    // The actual url
    const theUrl = weatherUrl + zip + myKey;

    getApiData(theUrl)
    .then((weatherData) => sendDataToTheServer({weatherData,feeling}))
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

            return response.json()
        }).then((data) => {
            return { name: data.name, temp: data.main.temp, description: data.weather[0].description, icon: data.weather[0].icon };
        })
        .catch(err => { console.log('error') }); // rejected in case of network error
}

function sendDataToTheServer(data){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
   return fetch('/datafromuserandapi', options);

}
/**
 1- API Credentials
 2- get data from the user
 3- get data from the api using data entered from the user
 4- send data to the server
 */

