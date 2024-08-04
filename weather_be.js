/*This line imports the `node-fetch` library, which is a module that allows us to make HTTP requests in a NODE.JS environment.
`require('node-fetch')` loads the module and assigns it to the `fetch` constant. */
const fetch = require('node-fetch');

// the function to convert Kelvin to Celsius and Fahrenheit
function kelvinToCelsiusFahrenheit(kelvin) {
    const celsius = kelvin - 273.15;
    const fahrenheit = celsius * (9 / 5) + 32;
    return [celsius, fahrenheit];
}

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "";
const CITY = "TOKYO";


/*Constructing the full URL with a way to change the `CITY` input value.
The backticks (```) denote a template literal, which allows you to embed variables directly within a string. */
const url = `${BASE_URL}appid=${API_KEY}&q=${CITY}`;


/* The `fetch` function returns a promise that resolves to the reponse object representing the HTTP response.*/
fetch(url)
    .then(response => response.json())  // First .then() handles the raw HTTP response and parses it as JSON
    .then(data => {  // Second .then() handles the parsed JSON data
        const temp_kelvin = data.main.temp;
        const [temp_celsius, temp_fahrenheit] = kelvinToCelsiusFahrenheit(temp_kelvin);
        console.log(`Celsius: ${temp_celsius}, Fahrenheit: ${temp_fahrenheit}`);
    })
    .catch(error => {
        console.error('Error:', error);
    });