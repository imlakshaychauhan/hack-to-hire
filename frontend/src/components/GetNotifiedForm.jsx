import { PropTypes } from "prop-types";

const GetNotifiedForm = ({addUserToDb}) => {
  return (
    <>
      <form onSubmit={addUserToDb}>
        <p> Your OTP has been successfully verified. Please proceed by clicking the button below. </p>
        <button className="submit-btn" type="submit">
          Get Notified
        </button>
      </form>
    </>
  );
};

GetNotifiedForm.propTypes = {
    addUserToDb: PropTypes.func.isRequired
}

export default GetNotifiedForm;
