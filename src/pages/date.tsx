import React, { useState } from 'react';
import './date.css'; // Import the custom styles
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Date = () => {
  const router = useRouter(); // Initialize useRouter hook
  const [formData, setFormData] = useState({
    dateAndTime: '',
    meetingPoint: '',
    venue: '',
    otherDetails: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlayAudioAndShowForm = () => {
    const audio = document.getElementById('background-audio') as HTMLAudioElement | null;
    if (audio) {
      audio.play().catch((error) => console.error('Error playing audio:', error));
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...formData, subject: 'Venue Details for Our Date' }),
      });
      if (response.ok) {
        // Reset form or show success message
        setFormData({
          dateAndTime: '',
          meetingPoint: '',
          venue: '',
          otherDetails: ''
        });
        setShowHearts(true);
        setTimeout(() => {
          setShowHearts(false);
          router.push('/endsplash'); // Redirect to /endsplash route using useRouter
        }, 1000); // Hide hearts after 5 seconds and then redirect
      } else {
        alert('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4 md:p-24 bg-bg-date">
      <audio id="background-audio" src="/date.mp3" loop></audio>
      <div className="flex flex-col items-center">
        <AnimatePresence>
          {!showForm && (
            <motion.button 
              onClick={handlePlayAudioAndShowForm} 
              className="btn rounded-lg focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 3 }}
              transition={{ duration: 1 }}
            >
              Plan Our Date 💐📅
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showForm && (
            <motion.form 
              onSubmit={handleSubmit} 
              className="flex flex-col gap-4 p-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
              transition={{ staggerChildren: 0.5 }}
            >
              <motion.label 
                style={{ textAlign: "center", fontWeight: "500" }}
                variants={formVariants}
              >
                SCHEDULE OUR DATE HERE
              </motion.label>
              <motion.input
                type="datetime-local"
                name="dateAndTime"
                value={formData.dateAndTime}
                onChange={handleChange}
                className="input dater"
                required
                variants={formVariants}
              />
              <motion.input
                type="text"
                name="meetingPoint"
                value={formData.meetingPoint}
                onChange={handleChange}
                className="input"
                placeholder="Meeting Point"
                required
                variants={formVariants}
              />
              <motion.input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="input"
                placeholder="Venue of Date"
                required
                variants={formVariants}
              />
              <motion.textarea
                name="otherDetails"
                value={formData.otherDetails}
                onChange={handleChange}
                className="textarea"
                placeholder="Other Details"
                variants={formVariants}
              />
              <motion.button 
                type="submit" 
                className="btn rounded-lg focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                variants={formVariants}
              >
                Send it to him
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showHearts && (
            <motion.div 
              className="hearts-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: 24 }, (_, index) => (
                <motion.div 
                  key={index} 
                  className="heart" 
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Date;
