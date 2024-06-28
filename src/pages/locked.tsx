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

  const handleUnlock = () => {
    // Validate the password
    if (password === 'letssee') {
      console.log('Password is correct, redirecting...');
      setIsCorrectPassword(true);
      setTimeout(() => {
        router.push('/');
      }, 1000); // Adjust the timeout to match your slide animation duration
    } else {
      console.log('Incorrect password.');
      alert('Incorrect password. Please try again.');
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
              transition={{ duration: 0.5, delay: 0.2 }}
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
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.button
              onClick={handleUnlock}
              className="unlock-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
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
