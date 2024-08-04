import requests

BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
API_KEY = "abcd"
CITY = "LONDON"


def kelvin_to_celsius_fahrenheit(kelvin):
    celsius = kelvin - 27
    fahrenheit = celsius * (9/5) + 32
    return celsius, fahrenheit


url = BASE_URL + "appid=" + API_KEY + "&q=" + CITY

response = requests.get(url).josn()

temp_kelvin = response['main']['temp']
temp_celsius, temp_fahrenheit = kelvin_to_celsius_fahrenheit(temp_kelvin)

print(response)


