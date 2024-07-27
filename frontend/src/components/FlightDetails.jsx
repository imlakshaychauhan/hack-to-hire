import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./stylings/FlightDetails.css";
import "./stylings/Form.css";
import leftArrow from "../assets/left-arrow.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {flight_details_uri, add_user_uri, dummyData, get_otp_uri, verify_otp_uri} from "../const";
import { createClient } from 'pexels';
import {pexels_api_key} from "../../credentials";
import GetNotifiedForm from "./GetNotifiedForm";
import VerifyOtpForm from "./VerifyOtpForm";
import GetOtpForm from "./GetOtpForm";
import FlightInfo from "./FlightInfo";

const FlightDetails = () => {
  const client = createClient(pexels_api_key);
  const { flightNumber } = useParams();
  const [flightData, setFlightData] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentNotificationChoice, setCurrentNotificationChoice] =
    useState("email");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  const [imgLink, setImgLink] = useState("");
  const [otp, setOtp] = useState("");
  const [otpFormStage, setOtpFormStage] = useState(1);
  //* Steps for OTP Verification:
  //* 1: Get OTP
  //* 2: Verify OTP
  //* 3: User Confirmation: Get Notified

  // Getting flights data by fln
  useEffect(() => {
    fetch(`${flight_details_uri}/${flightNumber}`)
    .then((response) => response.json())
    .then((data) => setFlightData(data))
    .catch((error) => console.error("Error fetching flight data:", error));
  }, [flightNumber]);

  // Fetching logo for airlines
  useEffect(() => {
    if(flightData.length === 0)
      return;
    const query = flightData[0].airline_name;
    client.photos.search({ query, per_page: 1 })
    .then(photos => setImgLink(photos.photos[0].src.portrait))
  }, [flightData]);

  // Changing the choice of registering contact for notifications
  const changeNotificationChoice = () => {
    if (currentNotificationChoice === "email") {
      setCurrentNotificationChoice("phone");
    } else {
      setCurrentNotificationChoice("email");
    }
  };

  // Showing Loading GIF while flight data is being fetched
  if (!flightData || !flightData.length) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif"
          style={{ borderRadius: "50%" }}
          width={350}
          height={350}
          alt="Loading"
        />
      </div>
    );
  }

  // Extracing important flight info
  const { airline_name, flnr, status } = flightData[0];

  // User is verified and can be added to database for notifications (or alerts)
  const addUserToDb = async (e) => {
    e.preventDefault();
    let user = {}
    if(currentNotificationChoice === "email")
      user = { email: email.toLowerCase(), phone_number: "", fln: flightNumber.toUpperCase() };
    else
      user = { email: "", phone_number: phoneNumber, fln: flightNumber.toUpperCase() };

    const response = await fetch(add_user_uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (data.is_user_added) {
      toast.success(`You will be notified about ${flightNumber}!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
      setPhoneNumber("");
      setEmail("");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    } else {
      setPhoneNumber("");
      setEmail("");
      setErrorMessage(true);
    }
  };

  // Getting OTP to the given contact by user
  const getOtp = async (e) => {
    e.preventDefault();
    let uri_suffix = "";
  
    if (currentNotificationChoice === "email")
      uri_suffix = `/${flightNumber}/email/${email}`;
    else
      uri_suffix = `/${flightNumber}/phoneNumber/${phoneNumber}`;
  
    const url = get_otp_uri + uri_suffix;
  
    const response = await fetch(url, {
      method: "GET",
    });
    
    // const data = await response.json();
    if (response.ok) {
      toast.success(`OTP sent to your ${currentNotificationChoice}!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
      setOtpFormStage(2);
    } else {
      toast.error("Error sending OTP, please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
    }
  };

  // Verifying OTP to the given OTP by user
  const verifyOtp = async (e) => {
    e.preventDefault();
  
    const uri_suffix = `/${otp}/${currentNotificationChoice === "email" ? email : phoneNumber}`;
    const url = verify_otp_uri + uri_suffix;
  
    const response = await fetch(url, {
      method: "GET",
    });
  
    // const data = await response.json();
    if (response.ok) {
      toast.success("OTP verified successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
      setOtpFormStage(3);
    } else {
      toast.error("Invalid OTP, please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
    }
    setOtp("");
  };
  
  return (
    <div>
      <ToastContainer />
      <button className="back-btn" onClick={() => navigate("/", { replace: true })}>
        <div className="back-btn-div">
          <img src={leftArrow} width={20} height={18} /> Back
        </div>
      </button>
      <div className="flight-details-container">

        <FlightInfo flightData={flightData} imgLink={imgLink} />

        {status !== "landed" && (
        <div className="notification-form">
          <div className="h-line"></div>
          <h2>Get Notified for {airline_name} {flnr}</h2>

          {/* Show otp form on 1st stage */}
          {otpFormStage === 1 && <GetOtpForm getOtp={getOtp} currentNotificationChoice={currentNotificationChoice} email={email} setEmail={setEmail} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} changeNotificationChoice={changeNotificationChoice} />}

          {/* Verify otp form on 2st stage */}
          {otpFormStage === 2 && <VerifyOtpForm verifyOtp={verifyOtp} otp={otp} setOtp={setOtp} contactType={currentNotificationChoice} />}

          {/* User confirmation form on 3rd stage */}
          {otpFormStage === 3 && <GetNotifiedForm addUserToDb={addUserToDb} />}
          {errorMessage && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              There is something wrong with your {currentNotificationChoice === "email" ? "Email" : "Phone Number"}, please try it again!
            </p>
          )}
        </div>
      )}

      </div>
    </div>
  );
};

export default FlightDetails;
