'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showFail, setShowFail] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const predefinedEmail = 'test@test.com';
  const predefinedPassword = 'test123';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === predefinedEmail && password === predefinedPassword) {
      // Handle successful login
      alert('Login successful!');
    } else {
      setShowFail(true);
    }
  };

  useEffect(() => {
    if (showFail) {
      setPlayCount((prev) => prev + 1);
    }
  }, [showFail]);

  useEffect(() => {
    if (playCount >= 1) {
      setTimeout(() => setShowFail(false), 4000); // Hide the video after it has played once
    }
  }, [playCount]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <AnimatePresence>
        {!showFail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <div className="flex justify-center">
              <Image src="https://cdn-icons-png.flaticon.com/512/906/906343.png" alt="Next.js Logo" width={180} height={37} priority/>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </motion.div>
        )}
        {showFail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 2 }}
            className="mt-4"
          >
            <video width="400" height="240" autoPlay style={{ borderRadius: "10px" }}>
              <source src="./fail.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
