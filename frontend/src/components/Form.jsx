import { useState } from 'react';
import './stylings/Form.css';

const Form = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ flightNumber, email, phoneNumber });
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
        <div className='input-class'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-class'>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
