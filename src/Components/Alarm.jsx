import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import audiof from '../assets/aring.mp3';

const Alarm = () => {
    const [time, setTime] = useState(new Date());
    const [alarms, setAlarms] = useState([]);
    const [inputTime, setInputTime] = useState('');
    const [is24Hour, setIs24Hour] = useState(false);
    const alarmTriggeredRef = useRef(new Set());

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour12: !is24Hour });
    };

    const getComparableTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour12: false });
    };

    const addAlarm = () => {
        if (inputTime) {
            const formattedTime = inputTime.length === 5 ? inputTime + ':00' : inputTime;
            if (!alarms.includes(formattedTime)) {
                setAlarms([...alarms, formattedTime]);
                setInputTime('');
            }
        }
    };

    const removeAlarm = (alarmToRemove) => {
        setAlarms(alarms.filter(alarm => alarm !== alarmToRemove));
        alarmTriggeredRef.current.delete(alarmToRemove);
    };

    const resetAllAlarms = () => {
        setAlarms([]);
        alarmTriggeredRef.current.clear();
    };

    const toggleFormat = () => {
        setIs24Hour(!is24Hour);
    };

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

    const triggerAlarm = (alarm) => {

        const timeParts = alarm.split(':');
        if (timeParts.length !== 3 || timeParts.some(part => isNaN(Number(part)))) {
            console.error('Invalid alarm time format:', alarm);
            return;
        }

        audioRef.current.play();
        Swal.fire({
            title: '⏰ Alarm Ringing!',
            text: `It's time for ${alarm}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Later (1 min)',
            cancelButtonText: 'Dismiss',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Snooze for 1 minute
                const [hour, minute, second] = alarm.split(':').map(Number);
                const newTime = new Date();
                newTime.setHours(hour);
                newTime.setMinutes(minute);
                newTime.setSeconds(Number(second) + 60);
                const newAlarm = getComparableTime(newTime);
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                if (!alarms.includes(newAlarm)) {
                    setAlarms((prev) => [...prev, newAlarm]);
                    alarmTriggeredRef.current.delete(newAlarm);
                }
            } else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                removeAlarm(alarm);
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now);

            const nowStr = getComparableTime(now);
            alarms.forEach((alarm) => {
                if (alarm === nowStr && !alarmTriggeredRef.current.has(alarm)) {
                    alarmTriggeredRef.current.add(alarm);
                    triggerAlarm(alarm);
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [alarms]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="relative w-full max-w-sm">
                <div className="animated-border p-[4px] rounded-2xl">
                    <div className="bg-black rounded-2xl p-6 text-center text-white">
                        <h2 className="text-gray-300 text-xl font-semibold mb-4">Digital Alarm</h2>

                        <div className="bg-gray-800 text-green-400 font-mono text-4xl py-6 rounded-lg shadow-inner mb-6">
                            {formatTime(time)}
                        </div>

                        {/* Alarm Input */}
                        <div className="mb-4">
                            <input
                                type="time"
                                value={inputTime}
                                onChange={(e) => setInputTime(e.target.value)}
                                className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                            />
                            <button
                                onClick={addAlarm}
                                className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500 transition"
                            >
                                Add Alarm
                            </button>
                        </div>

                        {/* Alarm List */}
                        {alarms.length > 0 && (
                            <div className="mb-4 text-left">
                                <p className="text-sm mb-2 text-gray-400">Set Alarms:</p>
                                <ul className="space-y-1">
                                    {alarms.map((alarm, index) => (
                                        <li key={index} className="flex justify-between items-center text-sm bg-gray-800 px-2 py-1 rounded">
                                            <span>{alarm}</span>
                                            <button
                                                onClick={() => removeAlarm(alarm)}
                                                className="text-red-400 hover:text-red-600"
                                            >
                                                ✕
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Control Buttons */}
                        <div className="flex justify-between space-x-4">
                            <button
                                className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition"
                                onClick={toggleFormat}
                            >
                                Format: {is24Hour ? '24H' : '12H'}
                            </button>
                            <button
                                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
                                onClick={resetAllAlarms}
                            >
                                Reset Alarms
                            </button>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/functions"
                                className="text-sm text-blue-400 hover:underline"
                            >
                                ← Back to Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alarm;
