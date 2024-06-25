'use client'; // Assuming this is a placeholder or specific requirement

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import to next/router
import Image from "next/image";
import Splash from './components/Splashscren/Splash'; // Adjusted the path for Splash component
import Link from 'next/link';

function Home() {
  const [noClickCount, setNoClickCount] = useState(0);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup display

  useEffect(() => {
    if (noClickCount === 2) {
      router.push("/nope");
    }
  }, [noClickCount, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500); // Adjust based on your app's loading time
    return () => clearTimeout(timer);
  }, []);

  const handlePlayAudio = () => {
    const audio = document.getElementById('background-audio') as HTMLAudioElement | null;
    if (audio) {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      setAudioPlayed(true);
      setShowCard(true);
    }
  };

  const handleNoClick = () => {
    setNoClickCount(prevCount => prevCount + 1);
    if (noClickCount === 0) {
      setShowPopup(true); // Show the popup on first 'No' click
    }
  };

  return (
    <>
      <audio id="background-audio" src="/bg.mp3"></audio>
      {isLoading ? (
        <Splash />
      ) : (
        <main className="flex h-screen items-center justify-center p-4 md:p-24 bg-bg-svg">
          <div className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 rounded-lg border border-gray-300 bg-black/30 shadow-xl border-neutral-700 bg-zinc-800/30 backdrop-blur-lg">
            <div className="flex flex-col items-center pb-10" style={{ opacity: "80%", color: "white" }}>
              {showCard && (
                <>
                  <Image
                    src="/start.jpeg"
                    alt="Image Alt Text"
                    className="mt-6 h-24 w-24 startimg"
                    width={120}
                    height={120}
                    priority
                  />
                  <h5 className="mb-1 text-xl font-medium text-white">I have a crush on you</h5>
                  <span className="text-sm text-gray-400">Wanna go out on a date with me?</span>
                  <div className="flex space-x-4 mt-6">
                    <Link href="/yep">
                      <p className="inline-flex items-center py-2 px-10 text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Yes
                      </p>
                    </Link>
                    <div className="relative">
                      <button
                        onClick={handleNoClick}
                        className="inline-flex items-center py-2 px-10 text-sm font-medium text-center border border-gray-300 rounded-lg focus:ring-4 focus:outline-none text-white bg-zinc-800 border-neutral-700 hover:bg-zinc-700 focus:ring-blue-700"
                      >
                        No
                      </button>
                      {showPopup && (
                        <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2 mb-2 w-32 p-2 text-center rounded-lg shadow-lg text-white bg-zinc-800 border-neutral-700">
                          😔 Please reconsider.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-800 text-gray-400 w-64">
  <p className="mt-0 text-sm font-semibold">
    &quot;Recently, I&apos;ve found myself drawn to you in ways I didn&apos;t expect. Being affectionate towards you has made me become a better person.&quot;
  </p>
</div>
                </>
              )}
              {!showCard && !audioPlayed && (
                <button
                  onClick={handlePlayAudio}
                  className="mt-10 inline-flex items-center py-10 px-20 text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  SHOW ME
                </button>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Home;