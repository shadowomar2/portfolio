import React, { useState } from 'react';
import './App.css'; // Import your CSS for styling
import Card from './Portfolio/Card';
import Portfolio from './Portfolio/Portfolio';
import Mouseshape from './Portfolio/Mouseshape';
import CustomNavbar from './Nav/CustomNavbar';
import Header from './Pages/Header';
import About from './Pages/About';
import Education from './Pages/Education';
import Experience from './Pages/Experience';
import Skills from './Pages/Skills';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';

const App = () => {
  const propsList = [
    {
      name: "canvas1",
      url: '/set/scene.gltf',
      rotationx: 0.71,
      rotationy: -0.06,
      scalex: 0.1,
      scaley: 0.1,
      scalez: 0.1,
    },
    {
      name: "canvas2",
      url: '/New folder/scene.gltf',
      rotationx: -1.8,
      rotationy: -0.06,
      scalex: 3,
      scaley: 3,
      scalez: 3,
    },
    {
      name: "canvas2",
      url: '/New folder/scene.gltf',
      rotationx: -1.8,
      rotationy: -0.06,
      scalex: 3,
      scaley: 3,
      scalez: 3,
    },
    // Add more props as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % propsList.length);
  };

  const previousSlide = () => {
    setCurrentSlide((currentSlide - 1 + propsList.length) % propsList.length);
  };

  return (
  
  <> 
   <Mouseshape />
   <CustomNavbar/>
  <div className="slideshow-container">
     
    <button className="prev" onClick={previousSlide}>Previous</button>
    <button className="next" onClick={nextSlide}>Next</button>
 
    <div className="slideshow">

      {propsList.map((props, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          
          {index === 2 ? <Card/> : <Portfolio props={props} />}
        </div>
      ))}

    </div>
    </div>
    </>
  );
}

export default App;
