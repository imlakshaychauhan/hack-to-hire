import { useState } from 'react';
import './stylings/Form.css';
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [flightNumber, setFlightNumber] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ flightNumber });
    navigate(`/flight-details/${flightNumber}`, { replace: true });
  };

  return (
    <div className="form-container">
    <h1>FlightTrack: Flight Status and Notifications</h1>
    <p>By IndiGo</p>
      <form onSubmit={handleSubmit}>
        <div className='input-class'>
          <label htmlFor="flightNumber">Flight Number <u> (mandatory)</u></label>
          <input
            type="text"
            id="flightNumber"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit">Get Flight Details</button>
      </form>
    </div>
  );
};

export default Form;
