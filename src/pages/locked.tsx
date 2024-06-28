'use client'; // Assuming this is a placeholder or specific requirement
import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import './locked.css';
import '../app/globals.css';

function Locked() {
  const [password, setPassword] = useState('');
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const router = useRouter();

  const handleUnlock = async () => {
    // Validate the password
    if (password === 'passedout') {
      setIsCorrectPassword(true);

      // Ensure the URL is defined
      const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;
      if (formspreeUrl) {
        // Send message to process.env.NEXT_PUBLIC_FORMSPREE_URL
        try {
          await fetch(formspreeUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'Password Correctly Entered' }),
          });
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        console.error('Formsprree URL is not defined in the environment variables');
      }

      setTimeout(() => {
        router.push('/');
      }, 1000); // Adjust the timeout to match your slide animation duration
    } else {
      alert('Incorrect password Gurl');
    }
  };

  return (
    <div className="overlay">
      <AnimatePresence>
        {!isCorrectPassword && (
          <motion.div
            className="card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h2
              style={{ fontWeight: "600" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              ENTER PROVIDED PASSWORD
            </motion.h2>
            <motion.input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="password-input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.button
              onClick={handleUnlock}
              className="unlock-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Unlock
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Locked;
