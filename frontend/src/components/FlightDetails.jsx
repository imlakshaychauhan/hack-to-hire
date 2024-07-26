import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./stylings/FlightDetails.css";
import "./stylings/Form.css";
import airplaneIcon from "../assets/airplane-icon.png";
import leftArrow from "../assets/left-arrow.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlightDetails = () => {
  const { flightNumber } = useParams();
  const [flightData, setFlightData] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentNotificationChoice, setCurrentNotificationChoice] =
    useState("email");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/get_flight_details/${flightNumber}`)
      .then((response) => response.json())
      .then((data) => setFlightData(data))
      .catch((error) => console.error("Error fetching flight data:", error));
  }, [flightNumber]);

  const changeNotificationChoice = () => {
    if (currentNotificationChoice === "email") {
      setCurrentNotificationChoice("phone");
    } else {
      setCurrentNotificationChoice("email");
    }
  };

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

  const {
    airline_name,
    flnr,
    status,
    departure_city,
    departure_name,
    departure_terminal,
    departure_gate,
    scheduled_departure_local,
    actual_departure_local,
    arrival_city,
    arrival_name,
    arrival_terminal,
    arrival_gate,
    scheduled_arrival_local,
    actual_arrival_local,
  } = flightData[0];

  const formatTime = (time) => new Date(time).toLocaleString();

  const getDelay = (scheduled, actual) => {
    const scheduledTime = new Date(scheduled);
    const actualTime = new Date(actual);
    const delay = (actualTime - scheduledTime) / (1000 * 60);
    const hours = Math.floor(delay / 60);
    const minutes = (delay % 60).toFixed(2);
    return `${hours ? `${hours} hour ` : ""}${minutes} minutes`;
  };

  const departureDelay = getDelay(
    scheduled_departure_local,
    actual_departure_local
  );
  const arrivalDelay = getDelay(scheduled_arrival_local, actual_arrival_local);

  const addUserToDb = async (e) => {
    e.preventDefault();

    const user = { email, phone_number: phoneNumber, fln: flightNumber };

    const response = await fetch("http://127.0.0.1:8000/add_user", {
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

  return (
    <div>
      <ToastContainer />
      <button
        className="back-btn"
        onClick={() => navigate("/", { replace: true })}
      >
        {" "}
        <div className="back-btn-div">
          {" "}
          <img src={leftArrow} width={20} height={18} /> Back{" "}
        </div>
      </button>
      <div className="flight-details-container">
        <div className="flight-info">
          <div className="flight-header">
            <div className="flight-header-left">
              <img
                src={`https://www.logo-designer.co/storage/2018/02/2018-new-lufthansa-logo-design-airplane-livery-2.png`}
                alt={airline_name}
                className="airline-logo"
              />
              <h2>
                {airline_name} {flnr}
              </h2>
            </div>
            <span className={`status ${status.toLowerCase()}`}>
              {status.toUpperCase()}
            </span>
          </div>
          <div className="flight-details">
            <div className="flight-route">
              <div className="airport-code">{departure_city}</div>
              <div className="flight-icon">
                <img src={airplaneIcon} width={30} height={30} />
              </div>
              <div className="airport-code">{arrival_city}</div>
            </div>
            <div className="airport-details">
              <div className="departure">
                <h3>Departure</h3>
                <p>
                  {departure_city}, {departure_name}
                </p>
                <p>
                  <b>Terminal:</b> {departure_terminal}, Gate: {departure_gate}
                </p>
                <p>
                  <b>Scheduled:</b> {formatTime(scheduled_departure_local)}
                </p>
                <p>
                  <b>Actual:</b> {formatTime(actual_departure_local)}
                </p>
                <p>
                  <b>Delay:</b> {departureDelay}
                </p>
              </div>
              <div className="arrival">
                <h3>Arrival</h3>
                <p>
                  {arrival_city}, {arrival_name}
                </p>
                <p>
                  <b>Terminal:</b> {arrival_terminal}, Gate: {arrival_gate}
                </p>
                <p>
                  <b>Scheduled:</b> {formatTime(scheduled_arrival_local)}
                </p>
                <p>
                  <b>Actual:</b> {formatTime(actual_arrival_local)}
                </p>
                <p>
                  <b>Delay:</b> {arrivalDelay}
                </p>
              </div>
            </div>
          </div>
        </div>
        {status !== "landed" ? (
          <div className="notification-form">
            <div className="h-line"></div>
            <h2>
              Get Notified for {airline_name} {flnr}
            </h2>
            <form onSubmit={addUserToDb}>
              {currentNotificationChoice === "email" ? (
                <div className="input-class">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="input-class">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              )}
              <button className="submit-btn" type="submit">
                Get Notified
              </button>
            </form>
            <button onClick={changeNotificationChoice}>
              Use{" "}
              {currentNotificationChoice === "email" ? "Phone Number" : "Email"}{" "}
              Instead
            </button>
            {errorMessage && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                There is something wrong with your{" "}
                {currentNotificationChoice === "email"
                  ? "Email"
                  : "Phone Number"}
                , please try it again!
              </p>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FlightDetails;
