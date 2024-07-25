import { useEffect, useState } from 'react';
import { backgroundImages } from "./const";
import './App.css';
import Form from './components/Form';

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
        {/* <h1>Your Text Here</h1> */}
        {/* <p>Some more text here...</p> */}
        <Form />
      </div>
    </div>
  );
}

export default App;
