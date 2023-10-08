import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { AmbientLight, DirectionalLight } from 'three'; // Import lights


function ModelControls({ model ,props,canvasname }) {
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const zoomSpeed = 0.0001; // Adjust the zoom speed as needed

  useEffect(() => {
    // Set initial rotation and scale values when the model ref is available
    if (model.current) {
      model.current.rotation.x =props.rotationx;
      model.current.rotation.y = props.rotationy;
      model.current.scale.x = props.scalex;
      model.current.scale.y = props.scaley;
      model.current.scale.z = props.scalez;




    }
  }, [model]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
     
    console.log( model.current.rotation.x);
    console.log( model.current.rotation.y);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const { clientX, clientY } = e;
    const delta = {
      x: (clientX - previousMousePosition.current.x) * 0.01,
      y: (clientY - previousMousePosition.current.y) * 0.01,
    };

    // Rotate the model based on mouse movement
    model.current.rotation.x -= delta.y;
    model.current.rotation.y -= delta.x;

    // Save the current mouse position for the next frame
    previousMousePosition.current = { x: clientX, y: clientY };
  };

  const handleMouseWheel = (e) => {
    // Zoom the model based on mouse scroll direction

    model.current.scale.x -= e.deltaY * zoomSpeed;
    model.current.scale.y -= e.deltaY * zoomSpeed;
    model.current.scale.z -= e.deltaY * zoomSpeed;
//  if( model.current.scale.z<1){
//     model.current.scale.z=1;
//  }
//  if( model.current.scale.x<1){
//     model.current.scale.x=1;
//  }
//  if( model.current.scale.y<1){
//     model.current.scale.y=1;
//  }
  };

  // Add event listeners for mouse interactions on the canvas
  console.log(canvasname);
  const canvas = document.getElementById(canvasname);
  if (canvas) {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('wheel', handleMouseWheel); // Handle mouse scroll
  }

  // Clean up event listeners when the component unmounts
  useEffect(() => {
    
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('wheel', handleMouseWheel);
      }
    };
  }, []);

  return null; // No need to render anything for this component
}

function Portfolio({props}) {
 
  const { scene } = useGLTF(props.url);
  const model = useRef();
  
  return (
    
    <Canvas id={props.name} style={{cursor:'move'}}>;
 
    <Suspense fallback={null}>
      {/* Ambient Light */}
     
      <ambientLight intensity={0.5} /> {/* Adjust intensity as needed */}
     
      
      <directionalLight
        color={0xffffff} // Light color (white)
        intensity={1.5} // Adjust intensity as needed
        position={[0, 0, 100]} // Light direction
      />

      <group ref={model}>
      <ModelControls model={model} props={props} canvasname={props.name} />
        <primitive object={scene} />
      </group>
    </Suspense>
  </Canvas>
  );
}

export default Portfolio;
