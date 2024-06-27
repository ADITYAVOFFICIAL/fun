import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image
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
    <div className="splash-screen bg-white dark:bg-black dark:text-white font-black">
       <Image src="/bat.gif" className="bat-gif" alt="Moving Bat" width={500} height={300} />
      <div className="first-text">
        {/* Escape apostrophe */}
        It&apos;s exactly what you thought could happen
      </div>
      {showSecondText && (
        <div className="second-text">
          I don't know how you will react
        </div>
      )}
    </div>
  );
};

export default Splash;