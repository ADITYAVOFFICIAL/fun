'use client'; // Assuming this is a placeholder or specific requirement
import { useState } from 'react';
import { useRouter } from 'next/router';
import './locked.css';

function Locked() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleUnlock = () => {
    // Add your unlock logic here
    console.log('Password entered:', password);
    // Example redirect after unlock
    router.push('/unlocked-page');
  };

  return (
    <div className="overlay">
      <div className="card">
        <h2>Enter Password</h2>
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
