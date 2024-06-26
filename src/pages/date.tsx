import React, { useState, useEffect } from 'react';
import './date.css'; // Import the custom styles
import { useRouter } from 'next/router';
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
      const response = await fetch('https://formspree.io/f/mwkdqzgr', {
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

  return (
    <div className="flex h-screen items-center justify-center p-4 md:p-24 bg-bg-date">
      <audio id="background-audio" src="/date.mp3" loop></audio>
      <div className="flex flex-col items-center">
        {!showForm && (
          <button onClick={handlePlayAudioAndShowForm} className="btn rounded-lg focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Plan Our Date 💐📅
          </button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <label style={{ textAlign: "center", fontWeight: "500" }}>SCHEDULE OUR DATE HERE</label>
            <input
              type="datetime-local"
              name="dateAndTime"
              value={formData.dateAndTime}
              onChange={handleChange}
              className="input dater"
              required
            />
            <input
              type="text"
              name="meetingPoint"
              value={formData.meetingPoint}
              onChange={handleChange}
              className="input"
              placeholder="Meeting Point"
              required
            />
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="input"
              placeholder="Venue of Date"
              required
            />
            <textarea
              name="otherDetails"
              value={formData.otherDetails}
              onChange={handleChange}
              className="textarea"
              placeholder="Other Details"
            />
            <button type="submit" className="btn rounded-lg focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
              Send it to him
            </button>
          </form>
        )}
        {showHearts && (
          <div className="hearts-container">
            <div className="heart" style={{ left: '50%', top: '50%' }}></div>
            <div className="heart" style={{ left: '60%', top: '55%' }}></div>
            <div className="heart" style={{ left: '40%', top: '45%' }}></div>
            <div className="heart" style={{ left: '30%', top: '35%' }}></div>
            <div className="heart" style={{ left: '70%', top: '65%' }}></div>
            <div className="heart" style={{ left: '20%', top: '25%' }}></div>
            <div className="heart" style={{ left: '80%', top: '75%' }}></div>
            <div className="heart" style={{ left: '10%', top: '15%' }}></div>
            <div className="heart" style={{ left: '90%', top: '85%' }}></div>
            <div className="heart" style={{ left: '15%', top: '20%' }}></div>
            <div className="heart" style={{ left: '85%', top: '80%' }}></div>
            <div className="heart" style={{ left: '25%', top: '30%' }}></div>
            <div className="heart" style={{ left: '75%', top: '70%' }}></div>
            <div className="heart" style={{ left: '35%', top: '40%' }}></div>
            <div className="heart" style={{ left: '65%', top: '60%' }}></div>
            <div className="heart" style={{ left: '45%', top: '50%' }}></div>
            <div className="heart" style={{ left: '55%', top: '55%' }}></div>
            <div className="heart" style={{ left: '42%', top: '48%' }}></div>
            <div className="heart" style={{ left: '58%', top: '52%' }}></div>
            <div className="heart" style={{ left: '32%', top: '38%' }}></div>
            <div className="heart" style={{ left: '68%', top: '62%' }}></div>
            <div className="heart" style={{ left: '22%', top: '28%' }}></div>
            <div className="heart" style={{ left: '78%', top: '72%' }}></div>
            <div className="heart" style={{ left: '12%', top: '18%' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Date;
