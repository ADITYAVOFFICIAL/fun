import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import './endsplash.css';
import '../app/globals.css';

const images = [
  '/ken9.gif',
  '/ken.gif',
  '/ken2.gif',
  '/kken.gif',
  '/ken3.webp',
  '/ryan.gif',
  '/ken5.gif'
];

const EndSplash = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const imagePromises = images.map((image) => {
      return new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.src = image;
        img.onload = () => resolve();
        img.onerror = (error) => reject(error);
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load images:', error);
      });

    // Preload audio
    const audio = new Audio('/end.mp3');
    audio.preload = 'auto';
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });

    return () => {
      audio.removeEventListener('canplaythrough', () => {
        setAudioLoaded(true);
      });
    };
  }, []);

  useEffect(() => {
    let interval: number | null = null;

    if (showSlideshow && imagesLoaded && audioLoaded) {
      // Start the slideshow with a 2 second interval
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000) as unknown as number;}

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [showSlideshow, imagesLoaded, audioLoaded]);

  const startSlideshow = () => {
    const audio = new Audio('/end.mp3');
    audio.loop = true;
    audio.play();
    setShowSlideshow(true);
  };

  return (
    <div className="slider-container">
      {!showSlideshow ? (
        <div className="splash-screen">
          <button
            className="font-extrabold inline-flex items-center py-5 px-10 text-xl font-medium text-center rounded-lg focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            onClick={startSlideshow}
          >
            My Reaction to that
          </button>
        </div>
      ) : (
        <AnimatePresence>
          {images.map((image, index) =>
            index === currentIndex ? (
              <motion.div
                key={image}
                initial={{ scale: 2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 2, opacity: 0.5 }}
                transition={{ duration: 1 }}
                className={`image-container ${image === '/ken5.gif' ? 'ken5' : ''}`}
              >
                <Image src={image} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default EndSplash;
