import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image
import { motion, AnimatePresence } from 'framer-motion';
import './Splash.css';
interface TypewriterProps {
  text: string;
}

// Typewriter effect component
const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 40); // Adjust typing speed here
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-screen bg-white dark:bg-black dark:text-white font-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image src="/bat.gif" className="bat-gif" alt="Moving Bat" width={500} height={300} />
          <div className="first-text">
            <Typewriter text="It&apos;s exactly what you thought could happen" />
          </div>
          {showSecondText && (
            <div className="second-text">
              <Typewriter text="I don&apos;t know how you will react" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;
