import React, { useState, useEffect } from 'react';
import './Splash.css';

const Splash = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      Exactly what you thought could happen
    </div>
  );
};

export default Splash;
