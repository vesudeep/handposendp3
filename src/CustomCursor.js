// CustomCursor.js
import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = (xyc) => {
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });

  const updateCursorPosition = (e) => {
    // setCursorPosition({ left: 1450, top: 690 });
    console.log(xyc);
    setCursorPosition({ left: 1450, top: 690 });
  };

  useEffect(() => {
    // document.addEventListener('mousemove', updateCursorPosition);
    // return () => {
    //   document.removeEventListener('mousemove', updateCursorPosition);
    // };
    updateCursorPosition();
  }, []);

  return (
    <div className="custom-cursor" style={cursorPosition}>
      {/* You can add custom cursor content here */}
    </div>
  );
};

export default CustomCursor;
