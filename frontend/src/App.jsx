import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { backgroundImages } from "./const";
import './App.css';
import Form from './components/Form';
import FlightDetails from './components/FlightDetails';
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}
      />
      <div className="overlay">
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/flight-details/:flightNumber" element={<FlightDetails />} />
            <Route path="*" element={<Form />} />
          </Routes>
          <LocationBasedToast />
        </Router>
      </div>
    </div>
  );
}

const LocationBasedToast = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.errorMessage) {
      toast.error(location.state.errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location]);

  return null;
};

export default App;
