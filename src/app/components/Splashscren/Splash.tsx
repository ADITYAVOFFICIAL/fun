import React, { useState, useEffect } from 'react';
import './Splash.css';

const Splash = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible(false);
    }, 30000);

    const timer2 = setTimeout(() => {
      setShowSecondText(true);
    }, 2000); // Adjust timing as needed

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-screen">
       <img src="bat.gif" class="bat-gif" alt="Moving Bat"></img>
      <div className="first-text">
        Exactly what you thought could happen
      </div>
      {showSecondText && (
        <div className="second-text">
          I really hope you understand
        </div>
      )}
    </div>
  );
};

export default Splash;
