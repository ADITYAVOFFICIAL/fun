import React, { useState } from 'react';
import Image from 'next/image';
import './yep.css'; // Import the custom styles
import confetti from 'canvas-confetti';

const Yep = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleConfetti = (e) => {
    e.preventDefault(); // Prevent default behavior of the link

    // Play audio
    const audio = new Audio('/nope.mp3');
    audio.loop = true;
    audio.play().catch((error) => console.error('Error playing audio:', error));

    // Function to generate random number within a range
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    // Burst 1: Confetti from the button itself
    confetti({
      particleCount: 100,
      spread: 360,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      }
    });

    // Burst 2 to 6: Confetti from random places on the screen
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: randomInRange(0.1, 0.9)
          }
        });
      }, (i + 1) * 1000); // Delay each burst by 1 second (adjust as needed)
    }

    // Simulate sending email to Formspree
    setTimeout(() => {
      fetch('https://formspree.io/f/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: 'Mission Successful',
          message: 'You did it'
        })
      })
      .then(response => {
        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.error('Failed to send email:', response.status);
        }
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });

      setAnimationComplete(true);

      // Redirect after animation (wait for animation to complete)
      setTimeout(() => {
        window.location.href = e.target.href || 'https://google.com'; // Default redirect
      }, 6000); // Adjust delay time as needed based on confetti animation duration
    }, 1000); // Adjust delay to start sending email after 1 second
  };

  return (
    <div className="flex h-screen items-center justify-center p-4 md:p-24 bg-gray-50 dark:bg-black">
      <div className="flex flex-col items-center">
        <Image
          src="/happy.webp"
          alt="Happy face"
          className="mt-6 h-50 w-400 sadimg"
          width={100}
          height={100}
          priority
        />
        <a
          href="https://google.com"
          onClick={handleConfetti}
          className="link inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Schedule a date
        </a>
      </div>
    </div>
  );
};

export default Yep;
