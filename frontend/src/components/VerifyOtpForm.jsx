import PropTypes from 'prop-types';
import "./stylings/FlightDetails.css";

const VerifyOtpForm = ({verifyOtp, otp, setOtp, contactType}) => {
  return (
    <>
      <p>please type the OTP, recieved on your contact: {contactType}</p>
      <form onSubmit={verifyOtp}>
        <div className="input-class">
          <label htmlFor="otp">Enter OTP</label>
          <input
            className='otp-input'
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify OTP</button>
      </form>
    </>
  );
};

VerifyOtpForm.propTypes = {
    verifyOtp: PropTypes.func.isRequired,
    otp: PropTypes.string.isRequired,
    setOtp: PropTypes.string.isRequired,
    contactType: PropTypes.string.isRequired
};

export default VerifyOtpForm;
