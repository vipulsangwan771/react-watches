import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const formatTime = (elapsedMs) => {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const milliseconds = String(elapsedMs % 1000).padStart(3, '0');
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="relative w-full max-w-sm">
        <div className="animated-border p-[4px] rounded-2xl">
          <div className="bg-black rounded-2xl p-6 text-center">
            <h2 className="text-gray-300 text-xl font-semibold mb-4">Digital Timer</h2>

            <div className="bg-gray-800 text-green-400 font-mono text-3xl py-6 rounded-lg shadow-inner mb-6">
              {formatTime(elapsedTime)}
            </div>

            <div className="flex justify-between space-x-4">
              <button onClick={startTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">
                Start
              </button>
              <button onClick={stopTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">
                Stop
              </button>
              <button onClick={resetTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">
                Reset
              </button>
            </div>

            <div className="mt-6">
              <Link to="/functions" className="text-sm text-blue-400 hover:underline">
                ← Back to Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;

