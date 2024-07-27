# FlightTrack: Flight Status and Notifications System

## Project Summary

This project aims to provide real-time flight status updates and notifications to passengers. The system displays current flight status (delays, cancellations, gate changes) and sends notifications for flight status changes via SMS and email.

## Features

1. **Real-time Updates**: Display current flight status including delays, cancellations, and gate changes.
2. **Push Notifications**: Send notifications for flight status changes via SMS and email.
3. **OTP Verification**: Implement OTP verification to prevent spamming and ensure only genuine users subscribe for notifications.
4. **Integration with Flightera API**: Pull real-time flight data from Flightera API for accurate information.

## Tech Stack

**Frontend**:
- **React.js**: Used to build the user interface.
- **HTML & CSS**: For structuring and styling the web application.
- **Toastify**: For providing toast notifications in the user interface.

**Backend**:
- **Python**: Primary language for server-side logic.
- **Flask**: Web framework for building the backend API.
- **smtplib**: Python library for sending emails.
- **Twilio**: Service for sending SMS notifications.
- **APScheduler**: For scheduling regular checks on flight status updates.

**Database**:
- **MongoDB**: Used to store user information and last known flight status details.

## Additional Tools and Libraries

- **Pymongo**: For MongoDB integration with Python.
- **Requests**: For making HTTP requests to external flight data APIs.
- **Twilio REST API**: For sending SMS messages.
- **Email MIME**: For constructing and sending email notifications.

## Solution Summary

The project consists of a frontend built with React.js that allows users to enter their email or phone number to receive notifications about their flight status. The backend is implemented with Flask, which handles API requests and interacts with MongoDB to store and retrieve user data.

To prevent spamming and ensure that only genuine users subscribe to notifications, the system includes OTP verification. When a user registers their email or phone number, an OTP is sent to them for verification. Only after the OTP is verified, the user is added to the notification list.

The backend also uses APScheduler to regularly check for updates in flight statuses. If any updates are detected (such as changes in flight status, gate, terminal, or delays), the system sends notifications via SMS (using Twilio) and email (using smtplib).

The flight data is fetched from the Flightera API, ensuring that users receive accurate and timely information about their flights. The system ensures that users are notified in a timely manner about any changes to their flight information.

The codebase includes error handling to manage invalid flight numbers and other potential issues, ensuring a robust and reliable system.

## How to Run the Project

1. **Clone the Repository**: Clone the GitHub repository to your local machine.
2. **Set Up Environment Variables**: Configure environment variables for Twilio and email credentials.
3. **Install Dependencies**: Install required packages using pip.
    ```bash
    pip install -r requirements.txt
    ```
4. **Run the Backend Server**: Start the Flask server.
    ```bash
    python app.py
    ```
5. **Run the Frontend Server**: Start the React development server.
    ```bash
    npm start
    ```
6. **Access the Application**: Open the web application in your browser and use it to receive flight status notifications.
