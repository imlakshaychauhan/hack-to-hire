import PropTypes from 'prop-types';
import { getDelay, formatTime } from "../utils";
import airplaneIcon from "../assets/airplane-icon.png";

const FlightInfo = ({ flightData, imgLink }) => {
  // Extracting important flight info
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

  // Computing departure delay
  const departureDelay = getDelay(scheduled_departure_local, actual_departure_local);

  // Computing arrival delay
  const arrivalDelay = getDelay(scheduled_arrival_local, actual_arrival_local);

  return (
    <>
      <div className="flight-info">
        <div className="flight-header">
          <div className="flight-header-left">
            <img src={imgLink} alt={airline_name} className="airline-logo" />
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
    </>
  );
};

FlightInfo.propTypes = {
  flightData: PropTypes.arrayOf(PropTypes.shape({
    airline_name: PropTypes.string.isRequired,
    flnr: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    departure_city: PropTypes.string.isRequired,
    departure_name: PropTypes.string.isRequired,
    departure_terminal: PropTypes.string,
    departure_gate: PropTypes.string,
    scheduled_departure_local: PropTypes.string.isRequired,
    actual_departure_local: PropTypes.string,
    arrival_city: PropTypes.string.isRequired,
    arrival_name: PropTypes.string.isRequired,
    arrival_terminal: PropTypes.string,
    arrival_gate: PropTypes.string,
    scheduled_arrival_local: PropTypes.string.isRequired,
    actual_arrival_local: PropTypes.string,
  })).isRequired,
  imgLink: PropTypes.string.isRequired,
};

export default FlightInfo;
