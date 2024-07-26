import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { backgroundImages } from "./const";
import './App.css';
import Form from './components/Form';
import FlightDetails from './components/FlightDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/flight-details/:flightNumber",
    element: <FlightDetails />
  },
  {
    path: "*",
    element: <Form />
  }
]);

function App() {
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
          <RouterProvider router={router} />
        </div>
      </div>
  );
}

export default App;
