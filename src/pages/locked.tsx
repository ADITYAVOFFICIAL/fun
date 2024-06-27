'use client'; // Assuming this is a placeholder or specific requirement
import { useState } from 'react';
import { useRouter } from 'next/router';
import './locked.css';
import '../app/globals.css';
function Locked() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleUnlock = () => {
    // Validate the password
    if (password === 'letssee') {
      console.log('Password is correct, redirecting...');
      router.push('/');
    } else {
      console.log('Incorrect password.');
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="overlay">
      <div className="card">
        <h2 style={{fontWeight:"600"}}>ENTER PROVIDED PASSWORD</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="password-input"
        />
        <button onClick={handleUnlock} className="unlock-button">
          Unlock
        </button>
      </div>
    </div>
  );
}

export default Locked;
