import PropTypes from 'prop-types';

const GetOtpForm = ({getOtp, currentNotificationChoice, email, setEmail, phoneNumber, setPhoneNumber, changeNotificationChoice}) => {
  return (
    <>
        <form onSubmit={getOtp}>
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
              <button type="submit">Get OTP</button>
        </form>
        <button onClick={changeNotificationChoice} className="instead-btn">
              Use {currentNotificationChoice === "email" ? "Phone Number" : "Email"} Instead
        </button>
    </>
  )
}

GetOtpForm.propTypes = {
  getOtp: PropTypes.func.isRequired,
  currentNotificationChoice: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  changeNotificationChoice: PropTypes.func.isRequired
};

export default GetOtpForm;
