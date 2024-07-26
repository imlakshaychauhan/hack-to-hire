import requests
import smtplib
from email.mime.text import MIMEText
from twilio.rest import Client
from credentials import x_rapidapi_host, x_rapidapi_key, account_sid, auth_token, twilio_phone_number, google_app_password, google_email


def getFlightInfo(flight_number):
    # flight_number = "LH767"
    url = f'https://flightera-flight-data.p.rapidapi.com/flight/info?flnr={
        flight_number}'
    headers = {
        'x-rapidapi-host': x_rapidapi_host,
        'x-rapidapi-key': x_rapidapi_key
    }

    response = requests.get(url, headers=headers)
    response = response.json()
    return response


def send_email(to_email, subject, message):
    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = google_email
    msg['To'] = to_email

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(google_email, google_app_password)
        server.sendmail(google_email, to_email, msg.as_string())


def send_sms(to, body):
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=body,
        from_=twilio_phone_number,
        to=to
    )

    print(f"Message sent to {to}. SID: {message.sid}")
