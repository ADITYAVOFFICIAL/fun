'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import './yep.css'; // Import the custom styles
import confetti from 'canvas-confetti';
import Link from 'next/link';
const Yep = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleConfetti = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default behavior of the link

    // Assuming you have imported and configured the confetti function correctly
    // Play audio
    const audio = new Audio('/start.mp3');
    audio.loop = true;
    audio.play().catch((error) => console.error('Error playing audio:', error));

    // Function to generate random number within a range
    const randomInRange = (min: number, max: number): number => Math.random() * (max - min) + min;
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
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: randomInRange(0.1, 0.9)
          }
        });
      }, (i + 1) * 2000); // Delay each burst by 1 second (adjust as needed)
    }

    // Simulate sending email to Formspree
    setTimeout(() => {
      fetch('https://formspree.io/f/mwkdqzgr', {
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
        const target = e.target as HTMLAnchorElement; // Asserting the target as HTMLAnchorElement
        window.location.href = target.href || 'https://wa.me/qr/JOEO5CKOGLUOF1'; // Default redirect
      }, 17900); // Adjust delay time as needed based on confetti animation duration
    }, 50); // Adjust delay to start sending email after 1 second
  };

  return (
    <div className="flex h-screen items-center justify-center p-4 md:p-24 bg-bg-yep">
      <div className="flex flex-col items-center">
        <Image
          src="/happy.webp"
          alt="Happy face"
          className="mt-6 h-50 w-400 sadimg"
          width={100}
          height={100}
          priority
        />
        <Link
          href="/date"
          onClick={handleConfetti}
          className="link inline-flex items-center py-2 px-4 text-sm font-medium text-white text-center rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Schedule a date
        </Link>
        <div className="footer-container"><p className="footer">Developed by Aditya Verma</p></div>
      </div>
    </div>
  );
};

export default Yep;
