from pymongo import MongoClient
from credentials import mongodb_uri

client = MongoClient(mongodb_uri)

db = client.hack_to_hire
collection = db.users

def add_user_to_database(fln, email, phone_number):
    user_data = {
        "fln": fln,
        "email": email,
        "phone_number": phone_number
    }

    response = collection.insert_one(user_data)
    return response
