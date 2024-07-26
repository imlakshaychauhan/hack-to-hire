from flask import Flask, request, render_template, jsonify
from flask_socketio import SocketIO
from db import add_user_to_database
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    email = data.get('email', "")
    phone_number = data.get('phone_number', "")
    fln = data.get('fln')

    if not fln or (not email and not phone_number):
        return jsonify({"error": "Flight number and either email or phone number are required", "is_user_added": False}), 400

    response = add_user_to_database(fln, email, phone_number)

    return jsonify({"message": "User added successfully", "id": str(response.inserted_id), "is_user_added": True}), 201


@app.route('/get_flight_details/<flight_number>', methods=['GET'])
def get_details(flight_number):
    flight_data = [
        {
            "actual_arrival_is_estimated": "false",
            "actual_arrival_local": "2024-07-25T06:21:09+02:00",
            "actual_arrival_utc": "2024-07-25T04:21:09Z",
            "actual_departure_is_estimated": "false",
            "actual_departure_local": "2024-07-25T02:16:37+05:30",
            "actual_departure_utc": "2024-07-24T20:46:37Z",
            "airline_iata": "LH",
            "airline_icao": "DLH",
            "airline_name": "Lufthansa",
            "arrival_city": "Munich",
            "arrival_gate": "M28",
            "arrival_iata": "MUC",
            "arrival_icao": "EDDM",
            "arrival_name": "Munich Airport",
            "arrival_terminal": "2",
            "codeshares": [
                "AC9587",
                "AI8763",
                "SK3599"
            ],
            "date": "2024-07-25T00:00:00Z",
            "departure_city": "Delhi",
            "departure_gate": "015",
            "departure_iata": "DEL",
            "departure_icao": "VIDP",
            "departure_name": "Delhi Indira Gandhi International Airport",
            "departure_terminal": "3",
            "family": "A380",
            "flnr": "LH763",
            "model": "A388",
            "reg": "D-AIMM",
            "scheduled_arrival_local": "2024-07-25T06:05:00+02:00",
            "scheduled_arrival_utc": "2024-07-25T04:05:00Z",
            "scheduled_departure_local": "2024-07-25T01:20:00+05:30",
            "scheduled_departure_utc": "2024-07-24T19:50:00Z",
            "status": "live"
        }
    ]
    return jsonify(flight_data)


if __name__ == '__main__':
    socketio.run(app, port=8000)
