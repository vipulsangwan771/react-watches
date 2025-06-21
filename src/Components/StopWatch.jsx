import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import audiof from '../assets/aring.mp3';
import Swal from 'sweetalert2';

const formatTime = (elapsedMs) => {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const milliseconds = String(elapsedMs % 1000).padStart(3, '0');
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const StopWatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [targetMinutes, setTargetMinutes] = useState('0');
  const [targetTime, setTargetTime] = useState(null);

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(audiof));

  useEffect(() => {
    audioRef.current.onerror = () => {
      console.error('Failed to load the alarm audio file');
    };
    audioRef.current.load();
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now() - startTimeRef.current;
        setElapsedTime(currentTime);

        if (targetTime && currentTime >= targetTime) {
          setIsRunning(false);
          clearInterval(intervalRef.current);

          try {
            audioRef.current.play();
          } catch (err) {
            console.error("Failed to play audio:", err);
          }

          Swal.fire({
            icon: 'success',
            title: "Time's up!",
            text: 'The timer has reached the target.',
            showCancelButton: true,
            confirmButtonText: 'Reset',
            cancelButtonText: 'Stop Audio',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            if (result.isConfirmed) {
              setElapsedTime(0);
              setTargetTime(null);
              setIsRunning(false);
            }
          });
        }
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, targetTime]);
  const startTimer = () => {
    const totalMilliseconds = parseFloat(targetMinutes) * 60 * 1000;
  
    if (totalMilliseconds <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Time',
        text: 'Please set a valid target time before starting the timer.',
      });
      return;
    }
  
    if (!targetTime) {
      setTargetTime(totalMilliseconds);
    }
  
    setIsRunning(true);
  };
  
  // const startTimer = () => {
  //   if (targetMinutes && !targetTime) {
  //     const totalMilliseconds = parseFloat(targetMinutes) * 60 * 1000;
  //     setTargetTime(totalMilliseconds);
  //   }
  //   setIsRunning(true);
  // };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setTargetTime(null);
  };

  // Helper functions to extract hours, minutes, seconds from targetMinutes
  const getHours = () => Math.floor(parseFloat(targetMinutes) / 60);
  const getMinutes = () => Math.floor(parseFloat(targetMinutes)) % 60;
  const getSeconds = () => Math.round((parseFloat(targetMinutes) * 60) % 60);

  // Time dropdown change handlers
  const handleTimeChange = (newHours, newMinutes, newSeconds) => {
    const totalSeconds = newHours * 3600 + newMinutes * 60 + newSeconds;
    const totalMinutes = totalSeconds / 60;
    setTargetMinutes(totalMinutes.toFixed(4));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="relative w-full max-w-sm">
        <div className="animated-border p-[4px] rounded-2xl">
          <div className="bg-black rounded-2xl p-6 text-center">
            <h2 className="text-gray-300 text-xl font-semibold mb-4">Digital StopWatch</h2>

            {/* Modern Dropdown Time Picker */}
            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-1">Set Target Time</label>

              {/* Hours Dropdown - full width */}
              <div className="mb-2">
                <select
                  value={getHours()}
                  onChange={(e) =>
                    handleTimeChange(parseInt(e.target.value), getMinutes(), getSeconds())
                  }
                  disabled={isRunning}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                >
                  {[...Array(24).keys()].map((h) => (
                    <option key={h} value={h}>{h} hr</option>
                  ))}
                </select>
              </div>

              {/* Minutes and Seconds Dropdown - side by side */}
              <div className="flex space-x-2">
                <select
                  value={getMinutes()}
                  onChange={(e) =>
                    handleTimeChange(getHours(), parseInt(e.target.value), getSeconds())
                  }
                  disabled={isRunning}
                  className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                >
                  {[...Array(60).keys()].map((m) => (
                    <option key={m} value={m}>{m} min</option>
                  ))}
                </select>

                <select
                  value={getSeconds()}
                  onChange={(e) =>
                    handleTimeChange(getHours(), getMinutes(), parseInt(e.target.value))
                  }
                  disabled={isRunning}
                  className="w-1/2 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                >
                  {[...Array(60).keys()].map((s) => (
                    <option key={s} value={s}>{s} sec</option>
                  ))}
                </select>
              </div>
            </div>


            {/* Time Display */}
            <div className="bg-gray-800 text-green-400 font-mono text-3xl py-6 rounded-lg shadow-inner mb-6">
              {formatTime(elapsedTime)}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-between space-x-4">
              <button onClick={startTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Start</button>
              <button onClick={stopTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Stop</button>
              <button onClick={resetTimer} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Reset</button>
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

export default StopWatch;
