import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import './nope.css'; // Import the custom styles
import Link from 'next/link';
const Nope = () => {
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const audio = document.getElementById('background-audio') as HTMLAudioElement;
    if (audio) {
      audio.play().catch((error) => console.error('Error playing audio:', error));
    }
  }, []);
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!reason.trim()) {
      setErrorMessage('Please provide a reason for rejection.');
      return;
    }

    const formData = new FormData();
    formData.append('message', reason);
    formData.append('subject', 'MISSION FAILED');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL as string, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setReason('');
        setErrorMessage('');
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };
  return (
    <div className="flex h-screen items-center justify-center p-4 bg-bg-nope">
      <audio id="background-audio" src="/nope.mp3" loop></audio>
      <div className="flex flex-col items-center">
        <Image
          src="/sad.gif"
          alt="Sad face"
          className="mt-6 h-50 w-400 sadimg"
          width={100}
          height={100}
          priority
        />
        <Link href={"/yep"} className="link inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">        
        You can still say yes</Link>
            <textarea
  placeholder="Reasons for rejection..."
  value={reason}
  onChange={(e) => {
    setReason(e.target.value);
    setErrorMessage('');
  }}
  required
  className="mt-10 py-2 px-4 w-full max-w-lg h-32 text-sm text-gray-900 rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
></textarea>
{errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
<button
          type="button"
          onClick={handleSubmit}
          className="ml-2 mt-3 py-2 px-4 text-sm font-medium rounded-lg  text-white focus:ring-4 focus:outline-non bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Send
        </button>
        <div className="footer-container"><p className="footer">Developed by Aditya Verma</p></div>
      </div>
    </div>
  );
};

export default Nope;