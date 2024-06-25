'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Splash from './components/Splashscren/Splash';
import Link from 'next/link';
function Home() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (noClickCount === 2) {
      router.push("/nope");
    }
  }, [noClickCount, router]);
  useEffect(() => {
    // Simulate loading or fetching data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500); // Adjust the time based on your app's loading time
    return () => clearTimeout(timer);
  }, []);
  const handleNoClick = () => {
    setNoClickCount(prevCount => prevCount + 1);
  };

  return (
    <>
      {isLoading ? (
        // Show the splash screen while the app is loading
        <Splash />
      ) : (
    <main className="flex h-screen items-center justify-center p-4 md:p-24 bg-black">
      <div className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 rounded-lg border border-gray-300 bg-black/30 shadow-xl border-neutral-700 bg-zinc-800/30 backdrop-blur-lg">
        <div className="flex flex-col items-center pb-10" style={{ opacity: "80%", color: "white" }}>
          <Image
            src="/start.jpeg"
            alt="Vercel Logo"
            className="mt-6 h-24 w-24 startimg"
            width={120}
            height={120}
            priority
          />
          <h5 className="mb-1 text-xl font-medium text-white">I have a crush on you</h5>
          <span className="text-sm text-gray-400">Wanna go out on date with me?</span>
          <div className="flex mt-4 space-x-3 md:mt-6">
          <Link
  href="/yep"
  className="link inline-flex items-center py-2 px-4 text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
>
  Yes
</Link>

            <div className="relative">
              <button
                onClick={handleNoClick}
                className="inline-flex items-center py-2 px-4 text-sm font-medium text-center border border-gray-300 rounded-lg  focus:ring-4 focus:outline-none  text-white bg-zinc-800 border-neutral-700 hover:bg-zinc-700 focus:ring-blue-700"
              >
                No
              </button>
              {isHovered && (
          <div className="absolute bottom-full mb-2 w-32 p-2 text-center  border border-gray-300 rounded-lg shadow-lg text-white bg-zinc-800 border-neutral-700">
            Hi
          </div>
        )}
              {noClickCount === 1 && (
                <div className="absolute bottom-full mb-2 w-32 p-2 text-center rounded-lg shadow-lg text-white bg-zinc-800 border-neutral-700">
                  😔 please
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
 )}
 </>
);
};

export default Home;
