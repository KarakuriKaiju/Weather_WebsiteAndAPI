import requests


api_key = '---'


#The below code was created based on https://medium.com/@rekalantar/how-to-build-a-simple-weather-app-in-python-with-openweathermap-api-447a2dd27898#:~:text=To%20get%20started%2C%20you%20will,and%20create%20a%20free%20account.


city = input('Which City should we check: ')

url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    temp = data['main']['temp']
    desc = data['weather'][0]['description']
    print(f'Temperature is at: {temp} K')
    print(f'Description: {desc}')
else:
    print('Could not fetch the data for the weather')
