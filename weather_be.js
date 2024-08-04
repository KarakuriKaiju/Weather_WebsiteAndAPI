const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
const API_KEY = process.env.API_KEY;

// Function to convert Kelvin to Celsius and Fahrenheit
function kelvinToCelsiusFahrenheit(kelvin) {
    const celsius = kelvin - 273.15;
    const fahrenheit = celsius * (9 / 5) + 32;
    return [celsius, fahrenheit];
}

// Endpoint to get weather data for a specified city
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const url = `${BASE_URL}appid=${API_KEY}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(data.cod).json({ error: data.message });
        }

        const temp_kelvin = data.main.temp;
        const [temp_celsius, temp_fahrenheit] = kelvinToCelsiusFahrenheit(temp_kelvin);
        const weatherDescription = data.weather[0].description;
        const roundedCelsius = Math.round(temp_celsius);
        const roundedFahrenheit = Math.round(temp_fahrenheit);

        res.json({
            city: city,
            weatherDescription: weatherDescription,
            temperature: {
                celsius: roundedCelsius,
                fahrenheit: roundedFahrenheit
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
