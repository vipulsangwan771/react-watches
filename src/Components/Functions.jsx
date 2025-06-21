import React from 'react';
import { Link } from 'react-router-dom';

const Functions = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">
                            Choose a Feature to Try
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Select from the available tools below to explore our time-related utilities.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        
                        <Link
                            to="/"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                        >
                            Home
                        </Link>
                    </div>
                </div>


                <div className="bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { name: 'Watch', path: '/watch' },
                        { name: 'Stopwatch', path: '/stopwatch' },
                        { name: 'Timer', path: '/timer' },
                        { name: 'Alarm', path: '/alarm' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="block bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-6 py-4 text-lg text-gray-700 font-medium shadow-sm transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Functions;
