from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO
from utils import getFlightInfo

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_flight_details/<flight_number>', methods=['GET'])
def get_details(flight_number):
    flight_data = getFlightInfo(flight_number)
    return jsonify(flight_data)

if __name__ == '__main__':
    socketio.run(app, port=8000)
