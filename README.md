# <p align="center">FlightTrack: Flight Status and Notifications System<p>
   <p align="center">
      <img src="https://github.com/user-attachments/assets/089a69c5-3705-4b4e-95e0-14e88e9e9bf9" alt="Home Page" />
   </p>
   <p align="center"><strong>Home Page</strong></p>
   
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

## Screenshots

1. **Home Page**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/089a69c5-3705-4b4e-95e0-14e88e9e9bf9" alt="Home Page" />
   </p>
   <p align="center"><strong>Home Page</strong></p>

2. **Filling Flight Number in Form**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/fd0ce721-ccbe-471c-9f06-fc3734ea4dce" alt="Flight Number Form" />
   </p>
   <p align="center"><strong>Filling Flight Number in Form</strong></p>

3. **Flight Details Display**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/590fcb46-dfa5-42d3-9336-efae29b940f9" alt="Flight Details" />
   </p>
   <p align="center"><strong>Flight Details Display</strong></p>

4. **Subscribing for Email Notifications**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/8ce99f83-0540-437f-a2fa-65cbb9ab0213" alt="Subscribe Email" />
   </p>
   <p align="center"><strong>Subscribing for Email Notifications</strong></p>

5. **OTP Sent to Email/Phone**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/5876db0d-5733-47dc-baad-d23bae156f3d" alt="OTP Sent" />
      <img src="https://github.com/user-attachments/assets/0d8de760-2c6e-49c9-a846-70cc158b1889" alt="OTP Screenshot" />
   </p>
   <p align="center"><strong>OTP Sent to Email/Phone</strong></p>

7. **Filling OTP for Verification**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/90ac8859-79d2-4c47-8c14-fa2e0a2683ae" alt="OTP Verification" />
   </p>
   <p align="center"><strong>Filling OTP for Verification</strong></p>

9. **Success Notification**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/1a2e1245-8029-4921-b1f6-03fbcad76f9a" alt="Success Notification" />
   </p>
   <p align="center"><strong>Success Notification</strong></p>

10. **Failed Notification**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/a0ef1a86-325f-426b-9cdc-4a9dccd978d7" alt="Failed Notification" />
   </p>
   <p align="center"><strong>Failed Notification</strong></p>

11. **User Confirmation for Updates**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/def8ff35-8356-4687-a15a-4a88005782b9" alt="User Confirmation" />
   </p>
   <p align="center"><strong>User Confirmation for Updates</strong></p>

12. **Update Notification on Email**
   <p align="center">
      <img src="https://github.com/user-attachments/assets/414b0e70-9d02-47b6-8f13-009b3ec8b928" alt="Update Notification" />
   </p>
   <p align="center"><strong>Update Notification on Email</strong></p>


## How to Run the Project

1. **Clone the Repository**: Clone the GitHub repository to your local machine.
2. **Set Up Environment Variables**: Configure environment variables for Twilio and email credentials.
3. **Install Dependencies**: Install required packages using pip.
    ```bash
    pip install -r requirements.txt
    ```
4. **credentials**: Update the data in credentials.py and credentials.js.
5. **Run the Backend Server**: Start the Flask server.
    ```bash
    python app.py
    ```
6. **Install Frontend Packages**: Install npm packages for React server.
    ```bash
    npm install -y
    ```
5. **Run the Frontend Server**: Start the React development server.
    ```bash
    npm run dev
    ```
6. **Access the Application on [http://localhost:5173](http://localhost:5173/)**: Open the web application in your browser and use it to receive flight status notifications.
