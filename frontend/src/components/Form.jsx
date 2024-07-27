import { useState } from 'react';
import './stylings/Form.css';
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [flightNumber, setFlightNumber] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/flight-details/${flightNumber.toUpperCase()}`, { replace: true });
  };

  return (
    <div className="form-container">
    <h1>FlightTrack: Flight Status and Notifications</h1>
    <p>By IndiGo</p>
      <form onSubmit={handleSubmit}>
        <div className='input-class'>
          <label htmlFor="flightNumber">Flight Number <span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            id="flightNumber"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
            placeholder="Enter your flight number (FLN)"
          />
        </div>

        <button type="submit">Get Flight Details</button>
      </form>
    </div>
  );
};

export default Form;
