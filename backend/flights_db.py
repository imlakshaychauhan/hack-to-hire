from pymongo import MongoClient
from credentials import mongodb_uri
# from const import indigoDummyData

client = MongoClient(mongodb_uri)

db = client.hack_to_hire
collection = db.flights

def add_flight_to_database():
    indigoDummyData = {
        "name": "6E123"
    }
    return collection.insert_one(indigoDummyData)

def get_flights_from_database(flight_number):
    return collection.find({"fln": flight_number, "$or": [{"arrival_name": arrival_name}, {"departure_name": departure_name}]})

# def check_contact_in_db(flight_number, contact):
#     return collection.find_one({"fln": flight_number, "$or": [{"email": contact}, {"phone_number": contact}]}) is not None

add_flight_to_database()