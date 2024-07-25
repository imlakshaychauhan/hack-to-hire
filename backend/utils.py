import requests

def getFlightInfo(flight_number):
    # flight_number = "LH767"
    url = f'https://flightera-flight-data.p.rapidapi.com/flight/info?flnr={flight_number}'
    headers = {
        'x-rapidapi-host': 'flightera-flight-data.p.rapidapi.com',
        'x-rapidapi-key': 'c7688d318amshc13629334ee4fc6p13e62ajsnfbdcbf33ed87'
    }

    response = requests.get(url, headers=headers)
    response = response.json()
    return response
